/**
 * sync-notion.ts
 *
 * Notion の各 DB からポートフォリオデータを取得し、portfolio.ts の
 * NOTION_SYNC_START / NOTION_SYNC_END マーカー間の内容を置換する。
 *
 * 必要な環境変数（.claude/settings.local.json の env セクションに設定）:
 *   NOTION_TOKEN          - Notion インテグレーショントークン（ntn_xxx 形式）
 *   NOTION_DB_SKILLS      - 言語・技術 DB の ID
 *   NOTION_DB_TEAM_WORKS  - チーム開発 DB の ID
 *   NOTION_DB_HACKATHON   - ハッカソン DB の ID
 *   NOTION_DB_PERSONAL    - 個人制作物 DB の ID
 *   NOTION_DB_CAREER      - 経歴 DB の ID
 *
 * 実行: npm run sync-notion
 */

import { Client, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_TS_PATH = resolve(__dirname, '../src/data/portfolio.ts')

// ---------- 型定義 ----------

type SkillLevel = 'advanced' | 'intermediate' | 'beginner'
type WorkCategory = 'team' | 'hackathon' | 'personal'

interface Skill {
  name: string
  level: SkillLevel
  category?: string
}

interface Work {
  title: string
  category: WorkCategory
  description: string
  url?: string
  stack?: string[]
  period?: string
  role?: string
  outcome?: string
}

interface CareerEntry {
  company: string
  role: string
  period: string
  description: string
  url?: string
}

// ---------- Notion プロパティ名の定数 ----------
// Notion 側でプロパティ名が変わった場合はここだけ修正する

const PROPS = {
  skills: {
    name: '名前',
    level: 'レベル',     // select: "⭐️" / "⭐️⭐️" / ... (⭐️の数でレベルを判定)
    category: 'カテゴリ', // select: Frontend / Backend / etc.
  },
  works: {
    name: '名前',
    github: 'GitHub',       // files (external URL)
    stack: '使用言語など',  // multi_select
    period: '期間',         // date
    role: '担当',           // multi_select
    outcome: '成果',        // rich_text (任意)
  },
  career: {
    name: '企業分類',       // title (企業名 + 種別が結合された形式)
    role: '職種・役割',     // multi_select
    period: '時期',         // date
    description: '内容',    // rich_text
  },
} as const

// ---------- 環境変数チェック ----------

function validateEnv(): void {
  const required = [
    'NOTION_TOKEN',
    'NOTION_DB_SKILLS',
    'NOTION_DB_TEAM_WORKS',
    'NOTION_DB_HACKATHON',
    'NOTION_DB_PERSONAL',
    'NOTION_DB_CAREER',
  ]
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    console.error(`sync-notion: 以下の環境変数が設定されていません: ${missing.join(', ')}`)
    console.error('  → .claude/settings.local.json の env セクションに追記してください。')
    process.exit(1)
  }
}

// ---------- Notion ヘルパー ----------

function getTitle(page: PageObjectResponse): string {
  const titleProp = Object.values(page.properties).find(p => p.type === 'title')
  if (!titleProp || titleProp.type !== 'title') return ''
  return titleProp.title.map(t => t.plain_text).join('')
}

function getProp(
  page: PageObjectResponse,
  name: string,
): PageObjectResponse['properties'][string] | undefined {
  return page.properties[name]
}

function getRichText(page: PageObjectResponse, name: string): string {
  const prop = getProp(page, name)
  if (!prop || prop.type !== 'rich_text') return ''
  return prop.rich_text.map(t => t.plain_text).join('')
}

function getSelect(page: PageObjectResponse, name: string): string | null {
  const prop = getProp(page, name)
  if (!prop || prop.type !== 'select') return null
  return prop.select?.name ?? null
}

function getMultiSelect(page: PageObjectResponse, name: string): string[] {
  const prop = getProp(page, name)
  if (!prop || prop.type !== 'multi_select') return []
  return prop.multi_select.map(s => s.name)
}

function getDate(page: PageObjectResponse, name: string): string | undefined {
  const prop = getProp(page, name)
  if (!prop || prop.type !== 'date') return undefined
  return prop.date?.start ?? undefined
}

// files プロパティから最初の external URL を取得
function getFileUrl(page: PageObjectResponse, name: string): string | undefined {
  const prop = getProp(page, name)
  if (!prop || prop.type !== 'files') return undefined
  for (const file of prop.files) {
    if (file.type === 'external') return file.external.url
  }
  return undefined
}

// "⭐️⭐️⭐️" 形式の select → SkillLevel に変換
function starsToLevel(stars: string | null): SkillLevel {
  if (!stars) return 'beginner'
  const count = (stars.match(/⭐/g) ?? []).length
  return count >= 4 ? 'advanced' : count === 3 ? 'intermediate' : 'beginner'
}

// ---------- Skills フェッチ ----------

async function fetchSkills(notion: Client): Promise<Skill[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_SKILLS!,
  })

  return response.results
    .filter(isFullPage)
    .map(page => {
      const name = getTitle(page)
      if (!name || name.startsWith('新規ページ')) return null

      const level = starsToLevel(getSelect(page, PROPS.skills.level))
      const category = getSelect(page, PROPS.skills.category) ?? undefined

      return { name, level, ...(category ? { category } : {}) } satisfies Skill
    })
    .filter((s): s is Skill => s !== null)
}

// ---------- Works フェッチ ----------

async function fetchWorksFromDb(
  notion: Client,
  dbId: string,
  category: WorkCategory,
): Promise<Work[]> {
  const response = await notion.databases.query({ database_id: dbId })

  return response.results
    .filter(isFullPage)
    .map(page => {
      const title = getTitle(page)
      if (!title || title.startsWith('新規ページ')) return null

      const url = getFileUrl(page, PROPS.works.github)
      const stack = getMultiSelect(page, PROPS.works.stack)
      const dateStr = getDate(page, PROPS.works.period)
      // date は "YYYY-MM-DD" 形式で来るので年月のみに整形
      const period = dateStr ? dateStr.slice(0, 7) : undefined
      const roleArr = getMultiSelect(page, PROPS.works.role)
      const role = roleArr.length > 0 ? roleArr.join(' / ') : undefined
      const outcome = getRichText(page, PROPS.works.outcome) || undefined

      // description: role + stack から簡潔に組み立てる
      const parts: string[] = []
      if (role) parts.push(role)
      if (stack.length > 0) parts.push(stack.join(' / '))
      if (period) parts.push(period)
      const description = parts.join('、') || title

      return {
        title,
        category,
        description,
        ...(url ? { url } : {}),
        ...(stack.length > 0 ? { stack } : {}),
        ...(period ? { period } : {}),
        ...(role ? { role } : {}),
        ...(outcome ? { outcome } : {}),
      } satisfies Work
    })
    .filter((w): w is Work => w !== null)
}

async function fetchAllWorks(notion: Client): Promise<Work[]> {
  const [team, hackathon, personal] = await Promise.all([
    fetchWorksFromDb(notion, process.env.NOTION_DB_TEAM_WORKS!, 'team'),
    fetchWorksFromDb(notion, process.env.NOTION_DB_HACKATHON!, 'hackathon'),
    fetchWorksFromDb(notion, process.env.NOTION_DB_PERSONAL!, 'personal'),
  ])
  return [...team, ...hackathon, ...personal]
}

// ---------- Career フェッチ ----------

async function fetchCareer(notion: Client): Promise<CareerEntry[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_CAREER!,
  })

  return response.results
    .filter(isFullPage)
    .map(page => {
      // 企業分類は title プロパティ（会社名 + 種別が結合されている）
      const company = getTitle(page)
      if (!company || company.startsWith('新規ページ')) return null

      const roleArr = getMultiSelect(page, PROPS.career.role)
      const role =
        roleArr.length > 0
          ? roleArr.join(' / ')
          : "TODO: Notion「経歴」DB の「職種・役割」が未入力"
      const dateStr = getDate(page, PROPS.career.period)
      const period = dateStr
        ? dateStr.slice(0, 7)
        : "TODO: Notion「経歴」DB の「時期」が未入力"
      const description =
        getRichText(page, PROPS.career.description) ||
        "TODO: 取り組んだ内容を 1〜2 文で。"

      return { company, role, period, description } satisfies CareerEntry
    })
    .filter((c): c is CareerEntry => c !== null)
}

// ---------- TypeScript コード生成 ----------

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

function genSkills(skills: Skill[]): string {
  return skills
    .map(s => {
      const cat = s.category ? `, category: '${escapeStr(s.category)}'` : ''
      return `    { name: '${escapeStr(s.name)}', level: '${s.level}'${cat} },`
    })
    .join('\n')
}

function genWorks(works: Work[]): string {
  return works
    .map(w => {
      const fields: string[] = [
        `      title: '${escapeStr(w.title)}'`,
        `      category: '${w.category}'`,
        `      description: '${escapeStr(w.description)}'`,
      ]
      if (w.url) fields.push(`      url: '${escapeStr(w.url)}'`)
      if (w.stack && w.stack.length > 0)
        fields.push(`      stack: [${w.stack.map(s => `'${escapeStr(s)}'`).join(', ')}]`)
      if (w.period) fields.push(`      period: '${escapeStr(w.period)}'`)
      if (w.role) fields.push(`      role: '${escapeStr(w.role)}'`)
      if (w.outcome) fields.push(`      outcome: '${escapeStr(w.outcome)}'`)
      return `    {\n${fields.join(',\n')},\n    },`
    })
    .join('\n')
}

function genCareer(career: CareerEntry[]): string {
  return career
    .map(c => {
      const fields: string[] = [
        `      company: '${escapeStr(c.company)}'`,
        `      role: '${escapeStr(c.role)}'`,
        `      period: '${escapeStr(c.period)}'`,
        `      description: '${escapeStr(c.description)}'`,
      ]
      if (c.url) fields.push(`      url: '${escapeStr(c.url)}'`)
      return `    {\n${fields.join(',\n')},\n    },`
    })
    .join('\n')
}

// ---------- マーカー置換 ----------

function replaceSection(
  content: string,
  key: 'skills' | 'works' | 'career',
  innerLines: string,
): string {
  const start = `// NOTION_SYNC_START: ${key}`
  const end = `// NOTION_SYNC_END: ${key}`

  const fieldName = key
  const header =
    key === 'skills'
      ? `  // Notion DB「言語・技術」より同期。\n  // level マッピング: ⭐️5/4 → advanced, ⭐️3 → intermediate, ⭐️2/1 → beginner。\n  // category は Notion 側の値（Frontend / Backend / Database / DevTools / Other）をそのまま使用。`
      : key === 'works'
        ? `  // Notion DB「チーム開発」「ハッカソン」「個人制作物」より同期。\n  // テンプレートの「新規ページ」は除外。\n  // stack は Notion「使用言語など」の値をそのまま使用（Skills.name との一致で関連 Work を導出）。`
        : `  // Notion DB「経歴」より同期。\n  // 期間・役割・内容が Notion 側未入力の場合は TODO プレースホルダを保持。`

  const newBlock =
    `${start}\n${header}\n  ${fieldName}: [\n${innerLines}\n  ],\n  ${end}`

  const regex = new RegExp(`${start}[\\s\\S]*?${end}`, 'm')
  if (!regex.test(content)) {
    throw new Error(`sync-notion: マーカー "${start}" / "${end}" が portfolio.ts に見つかりません。`)
  }
  return content.replace(regex, newBlock)
}

// ---------- メイン ----------

async function main(): Promise<void> {
  validateEnv()

  const notion = new Client({ auth: process.env.NOTION_TOKEN })

  console.log('sync-notion: Notion DB をフェッチ中…')
  const [skills, works, career] = await Promise.all([
    fetchSkills(notion),
    fetchAllWorks(notion),
    fetchCareer(notion),
  ])
  console.log(
    `sync-notion: 取得完了 — skills: ${skills.length}, works: ${works.length}, career: ${career.length}`,
  )

  const currentContent = readFileSync(PORTFOLIO_TS_PATH, 'utf-8')

  let newContent = currentContent
  newContent = replaceSection(newContent, 'skills', genSkills(skills))
  newContent = replaceSection(newContent, 'works', genWorks(works))
  newContent = replaceSection(newContent, 'career', genCareer(career))

  if (newContent === currentContent) {
    console.log('sync-notion: 変更なし。スキップします。')
    process.exit(0)
  }

  // ロールバック用バックアップ
  const backupPath = `/tmp/portfolio-backup-${Date.now()}.ts`
  writeFileSync(backupPath, currentContent, 'utf-8')
  console.log(`sync-notion: バックアップ → ${backupPath}`)

  writeFileSync(PORTFOLIO_TS_PATH, newContent, 'utf-8')
  console.log(
    `sync-notion: portfolio.ts を更新しました（skills: ${skills.length}, works: ${works.length}, career: ${career.length}）`,
  )
}

main().catch(err => {
  console.error('sync-notion: エラー:', err)
  process.exit(1)
})
