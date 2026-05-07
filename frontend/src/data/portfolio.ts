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

export type SkillLevel = 'advanced' | 'intermediate' | 'beginner'

export interface Skill {
  name: string
  // 習熟度（Skills セクションの主軸グルーピング）
  level: SkillLevel
  // 任意のカテゴリ（言語 / フレームワーク / ツール / OS など）— 表示には使わないが将来用に保持
  category?: string
}

export type WorkCategory = 'team' | 'hackathon' | 'personal'

export interface Work {
  title: string
  category: WorkCategory
  description: string
  // 公開リポジトリやデモがあれば
  url?: string
  // 主な使用技術 — Skills チップとマッチさせて関連 Work 一覧を導出する
  stack?: string[]
  // 開催年や期間 (例: "2024", "2024-04 〜 2024-08")
  period?: string
  // 担当した役割（例: "PM", "Frontend", "Solo"）
  role?: string
  // 成果 / 学び（1行ハイライト。例: "学内コンテスト 1位", "OSS 公開"）
  outcome?: string
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
    catchphrase:
      '💻 課題を正面から捉え、チームと共にコードで解決するエンジニアを目指しています。',
    // TODO: アイコン画像を frontend/public/ に配置後、'/icon-character.png' などのパスを設定
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
      handle: 'Uchiyama Shotaro',
      url: 'https://www.linkedin.com/in/%E5%B0%86%E5%A4%AA%E6%9C%97-%E5%86%85%E5%B1%B1-5b3377361/',
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

  // TODO: 各スキルの level は user 本人による最終確認が必要。
  // 暫定割当: 主言語/長期プロジェクト=advanced、複数経験=intermediate、学習中=beginner
  skills: [
    { name: 'Python', level: 'advanced', category: 'language' },
    { name: 'Java', level: 'intermediate', category: 'language' },
    { name: 'JavaScript', level: 'intermediate', category: 'language' },
    { name: 'TypeScript', level: 'intermediate', category: 'language' },
    { name: 'HTML/CSS', level: 'intermediate', category: 'language' },
    { name: 'PHP', level: 'beginner', category: 'language' },
    { name: 'SQL', level: 'beginner', category: 'language' },
    { name: 'C# (Unity)', level: 'beginner', category: 'language' },
    { name: 'GitHub / Git', level: 'advanced', category: 'tool' },
    { name: 'macOS', level: 'advanced', category: 'os' },
  ],

  // TODO: 各 Work の中身は user 本人が埋める。stack の値が Skill.name と一致すると
  // Skills セクションの該当チップから関連 Work として表示される（大文字小文字無視）。
  works: [
    {
      title: 'TODO: チーム開発プロジェクト名',
      category: 'team',
      description: 'TODO: どんなプロジェクトで、どんな課題を、どう解決したかを 2〜3 文で。',
      role: 'TODO: 例 "Frontend 担当" / "PM" / "全体設計"',
      outcome: 'TODO: 例 "学内コンテスト1位" / "ユーザ100人到達"',
      stack: ['TypeScript', 'Python'],
      period: 'TODO: 例 "2024-06 〜 2024-09"',
    },
    {
      title: 'TODO: ハッカソン作品名',
      category: 'hackathon',
      description: 'TODO: テーマ・自分のロール・実装した機能を 2〜3 文で。',
      role: 'TODO: 例 "Backend 兼 LT 発表"',
      outcome: 'TODO: 例 "Best Tech Award 受賞"',
      stack: ['JavaScript', 'C# (Unity)'],
      period: 'TODO: 例 "2024-08（48h）"',
    },
    {
      title: 'TODO: 個人制作物名',
      category: 'personal',
      description: 'TODO: 動機・作ったもの・公開状態を 2〜3 文で。',
      outcome: 'TODO: 例 "OSS 公開、★50"',
      stack: ['Python', 'SQL'],
      period: 'TODO: 例 "2025"',
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
