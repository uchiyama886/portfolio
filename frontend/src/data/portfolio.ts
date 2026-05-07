/**
 * portfolio.ts — 表示する全コンテンツの集約点。
 *
 * 実装規約: ハードコードはここに集約し、各コンポーネントは props 経由で受け取る。
 * 詳細: frontend/implementation-spec.md「実装する5セクション」を参照。
 *
 * 各 TODO はユーザー本人による最終確認が必要な箇所。
 */

// ---------- 型定義 ----------

export type SocialPlatform = 'github' | 'x' | 'linkedin'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  handle: string
  url: string
}

export interface Skill {
  name: string
  // 任意のカテゴリ（言語 / フレームワーク / ツール / OS など）
  category?: string
}

export type WorkCategory = 'team' | 'hackathon' | 'personal'

export interface Work {
  title: string
  category: WorkCategory
  description: string
  // 公開リポジトリやデモがあれば
  url?: string
  // 主な使用技術
  stack?: string[]
  // 開催年や期間 (例: "2024", "2024-04 〜 2024-08")
  period?: string
}

export interface CareerEntry {
  company: string
  role: string
  period: string
  description: string
  url?: string
}

export interface Hero {
  name: string
  catchphrase: string
  // public/ 配下のアイコンパス（base 適用は <img> 側で行う）
  iconSrc?: string
}

export interface About {
  // 大学・学年などのファクト
  affiliation: string
  // 自己紹介本文（複数段落）
  paragraphs: string[]
}

export interface Portfolio {
  hero: Hero
  links: SocialLink[]
  about: About
  skills: Skill[]
  works: Work[]
  career: CareerEntry[]
}

// ---------- データ本体（プレースホルダ） ----------

export const portfolio: Portfolio = {
  hero: {
    name: 'Uchiyama Shotaro',
    // TODO: 最終的なキャッチコピーを user に確認
    catchphrase: 'Student engineer building things on the web.',
    // TODO: アイコン画像を public/ に配置してパスを設定
    iconSrc: undefined,
  },

  links: [
    {
      platform: 'github',
      label: 'GitHub',
      handle: 'uchiyama886',
      url: 'https://github.com/uchiyama886',
    },
    {
      platform: 'x',
      label: 'X (Twitter)',
      handle: '@angleknock',
      url: 'https://x.com/angleknock',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      // TODO: LinkedIn のハンドル/URL を user に確認
      handle: 'TODO',
      url: 'https://www.linkedin.com/',
    },
  ],

  about: {
    affiliation: '京都産業大学 情報理工学部 情報理工学科 / 2027年卒',
    paragraphs: [
      // TODO: 本文を user 提供の文面に差し替える
      '学生団体「あまてく」3代目代表として活動中。',
      'Web フロントエンドからゲーム開発まで幅広く触れています。',
    ],
  },

  skills: [
    { name: 'Python', category: 'language' },
    { name: 'Java', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'TypeScript', category: 'language' },
    { name: 'HTML/CSS', category: 'language' },
    { name: 'PHP', category: 'language' },
    { name: 'SQL', category: 'language' },
    { name: 'C# (Unity)', category: 'language' },
    { name: 'GitHub / Git', category: 'tool' },
    { name: 'macOS', category: 'os' },
  ],

  works: [
    // TODO: チーム開発の実績を user に確認して追加
    {
      title: 'TODO: チーム開発プロジェクト名',
      category: 'team',
      description: 'TODO: 概要を1〜2文で。',
    },
    // TODO: ハッカソン参加作品
    {
      title: 'TODO: ハッカソン作品名',
      category: 'hackathon',
      description: 'TODO: 概要を1〜2文で。',
    },
    // TODO: 個人制作
    {
      title: 'TODO: 個人制作物名',
      category: 'personal',
      description: 'TODO: 概要を1〜2文で。',
    },
  ],

  career: [
    {
      company: 'Rakus TechLab.',
      role: '3days インターン',
      // TODO: 期間を user に確認
      period: 'TODO',
      description: 'TODO: 取り組んだ内容を1〜2文で。',
    },
    {
      company: 'Digital Garage',
      role: '3days インターン',
      // TODO: 期間を user に確認
      period: 'TODO',
      description: 'TODO: 取り組んだ内容を1〜2文で。',
    },
  ],
}
