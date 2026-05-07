/**
 * sync-notion.ts
 *
 * Notion の各 DB からポートフォリオデータを取得し、portfolio.ts の
 * NOTION_SYNC_START / NOTION_SYNC_END マーカー間の内容を置換する。
 *
 * 必要な環境変数（.claude/settings.local.json の env セクションに設定）:
 *   NOTION_TOKEN          - Notion インテグレーショントークン
 *   NOTION_DB_SKILLS      - 言語・技術 DB の ID
 *   NOTION_DB_TEAM_WORKS  - チーム開発 DB の ID
 *   NOTION_DB_HACKATHON   - ハッカソン DB の ID
 *   NOTION_DB_PERSONAL    - 個人制作物 DB の ID
 *   NOTION_DB_CAREER      - 経歴 DB の ID
 *
 * 実行: npm run sync-notion
 */

import { Client, isFullPage } from '@notionhq/client'
import type {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
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
    rating: 'Rating',
    category: 'Category',
  },
  works: {
    name: '名前',
    url: 'URL',
    stack: 'Stack',
    period: '期間',
    role: '役割',
    outcome: '成果',
  },
  career: {
    name: '名前',
    role: '役割',
    period: '時期',
    description: '内容',
    url: 'URL',
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

function getPropByName(
  page: PageObjectResponse,
  name: string,
): PageObjectResponse['properties'][string] | undefined {
  return page.properties[name]
}

function getRichText(page: PageObjectResponse, name: string): string {
  const prop = getPropByName(page, name)
  if (!prop || prop.type !== 'rich_text') return ''
  return (prop as RichTextPropertyItemObjectResponse).rich_text
    .map(t => t.plain_text)
    .join('')
}

function getNumber(page: PageObjectResponse, name: string): number | null {
  const prop = getPropByName(page, name)
  if (!prop || prop.type !== 'number') return null
  return (prop as NumberPropertyItemObjectResponse).number
}

function getSelect(page: PageObjectResponse, name: string): string | null {
  const prop = getPropByName(page, name)
  if (!prop || prop.type !== 'select') return null
  return (prop as SelectPropertyItemObjectResponse).select?.name ?? null
}

function getMultiSelect(page: PageObjectResponse, name: string): string[] {
  const prop = getPropByName(page, name)
  if (!prop || prop.type !== 'multi_select') return []
  return (prop as MultiSelectPropertyItemObjectResponse).multi_select.map(s => s.name)
}

function getUrl(page: PageObjectResponse, name: string): string | undefined {
  const prop = getPropByName(page, name)
  if (!prop || prop.type !== 'url') return undefined
  return (prop as UrlPropertyItemObjectResponse).url ?? undefined
}

// ---------- Skills フェッチ ----------

async function fetchSkills(notion: Client): Promise<Skill[]> {
  const dbId = process.env.NOTION_DB_SKILLS!
  const response = await notion.databases.query({ database_id: dbId })

  return response.results
    .filter(isFullPage)
    .map(page => {
      const name = getTitle(page)
      if (!name || name.startsWith('新規ページ')) return null

      const rating = getNumber(page, PROPS.skills.rating) ?? 1
      const level: SkillLevel =
        rating >= 4 ? 'advanced' : rating === 3 ? 'intermediate' : 'beginner'
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

      const url = getUrl(page, PROPS.works.url)
      const stack = getMultiSelect(page, PROPS.works.stack)
      const period = getRichText(page, PROPS.works.period) || undefined
      const role = getRichText(page, PROPS.works.role) || undefined
      const outcome = getRichText(page, PROPS.works.outcome) || undefined

      // description は role / stack / period から再構成
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
  const dbId = process.env.NOTION_DB_CAREER!
  const response = await notion.databases.query({ database_id: dbId })

  return response.results
    .filter(isFullPage)
    .map(page => {
      const company = getTitle(page)
      if (!company || company.startsWith('新規ページ')) return null

      const role =
        getRichText(page, PROPS.career.role) ||
        "TODO: Notion「経歴」DB の「役割」が未入力"
      const period =
        getRichText(page, PROPS.career.period) ||
        "TODO: Notion「経歴」DB の「時期」が未入力"
      const description =
        getRichText(page, PROPS.career.description) ||
        "TODO: 取り組んだ内容を 1〜2 文で。"
      const url = getUrl(page, PROPS.career.url)

      return {
        company,
        role,
        period,
        description,
        ...(url ? { url } : {}),
      } satisfies CareerEntry
    })
    .filter((c): c is CareerEntry => c !== null)
}

// ---------- TypeScript コード生成 ----------

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

function genSkills(skills: Skill[]): string {
  const lines = skills.map(s => {
    const cat = s.category ? `, category: '${escapeStr(s.category)}'` : ''
    return `    { name: '${escapeStr(s.name)}', level: '${s.level}'${cat} },`
  })
  return lines.join('\n')
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

  // skills は "skills: [\n...\n  ]," の形式、works/career も同様
  const fieldName = key
  const newBlock =
    key === 'skills'
      ? `${start}\n  // Notion DB「言語・技術」より同期。\n  // level マッピング: ⭐️5/4 → advanced, ⭐️3 → intermediate, ⭐️2/1 → beginner。\n  // category は Notion 側の値（Frontend / Backend / Database / DevTools / Other）をそのまま使用。\n  ${fieldName}: [\n${innerLines}\n  ],\n  ${end}`
      : key === 'works'
        ? `${start}\n  // Notion DB「チーム開発」「ハッカソン」「個人制作物」より同期。\n  // テンプレートの「新規ページ」と「シンギング・グラス」配下の制作過程サブページは除外。\n  // stack の値は Skills.name と一致させると関連 Work として該当チップ選択時に表示される\n  // （例: "C#(Unity)" / "HTML・CSS" の合体表記）。Notion 側の元 multi-select 値も併記。\n  ${fieldName}: [\n${innerLines}\n  ],\n  ${end}`
        : `${start}\n  // Notion DB「経歴」より同期。\n  // 期間と職種・役割の列は Notion 側に値が入っていなかったため TODO のまま残置。\n  ${fieldName}: [\n${innerLines}\n  ],\n  ${end}`

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
