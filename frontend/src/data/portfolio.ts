/**
 * portfolio.ts — 表示する全コンテンツの集約点。
 *
 * 実装規約: ハードコードはここに集約し、各コンポーネントは props 経由で受け取る。
 * 詳細: frontend/implementation-spec.md「実装する5セクション」を参照。
 *
 * このファイルの内容は、Notion 上の「Uchiyama Shotaro's Portfolio」ページ配下の
 * 各 DB（言語・技術 / チーム開発 / ハッカソン / 個人制作物 / 経歴）から
 * 2026-05-07 時点の手動同期で生成されている。Notion 側に description / outcome 列が
 * 存在しないため、本文は DB 列値の簡潔な再構成のみで、各 TODO は Notion を
 * 加筆するか本ファイルを直接編集することで埋める。
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

// ---------- データ本体（Notion 同期 2026-05-07） ----------

export const portfolio: Portfolio = {
  hero: {
    name: 'Uchiyama Shotaro',
    catchphrase:
      '💻 課題を正面から捉え、チームと共にコードで解決するエンジニアを目指しています。',
    iconSrc: 'icon-character.png',
  },

  links: [
    {
      platform: 'github',
      label: 'GitHub',
      handle: 'uchiyama886',
      url: 'https://github.com/uchiyama886/',
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
    affiliation: '京都産業大学 情報理工学部 情報理工学科 / 2027年卒業予定',
    paragraphs: [
      '学生団体「あまてく」3代目代表として、中小企業と学生エンジニアをつなぐプラットフォームの開発をリード。Python / TypeScript / Java を中心に、バックエンドからフロントエンドまで幅広く対応。チーム開発やハッカソンを通じて、課題を正面から捉え、コードで解決するエンジニアを目指しています。',
      '趣味は読書（特に SF！）とコーヒー（お気に入りは前田珈琲 文博店）。',
    ],
  },

  // NOTION_SYNC_START: skills
  // Notion DB「言語・技術」より同期。
  // level マッピング: ⭐️5/4 → advanced, ⭐️3 → intermediate, ⭐️2/1 → beginner。
  // category は Notion 側の値（Frontend / Backend / Database / DevTools / Other）をそのまま使用。
  skills: [
    { name: 'PHP', level: 'beginner', category: 'Backend' },
    { name: 'JavaScript', level: 'intermediate', category: 'Frontend' },
    { name: 'C#(Unity)', level: 'beginner', category: 'Other' },
    { name: 'GitHub・Git', level: 'beginner', category: 'DevTools' },
    { name: 'TypeScript', level: 'intermediate', category: 'Frontend' },
    { name: 'macOS', level: 'beginner', category: 'DevTools' },
    { name: 'SQL', level: 'beginner', category: 'Database' },
    { name: 'Python', level: 'beginner', category: 'Backend' },
    { name: 'Java', level: 'beginner', category: 'Backend' },
    { name: 'HTML・CSS', level: 'beginner', category: 'Frontend' },
  ],
  // NOTION_SYNC_END: skills

  // NOTION_SYNC_START: works
  // Notion DB「チーム開発」「ハッカソン」「個人制作物」より同期。
  // テンプレートの「新規ページ」は除外。
  // stack は Notion「使用言語など」の値をそのまま使用（Skills.name との一致で関連 Work を導出）。
  works: [
    {
      title: 'ウェーブレット変換アプリケーション',
      category: 'team',
      description: 'PM、HTML / CSS / Python / Shell / Java、2024-09',
      url: 'https://github.com/uchiyama886/ProjectPractice',
      stack: ['HTML', 'CSS', 'Python', 'Shell', 'Java'],
      period: '2024-09',
      role: 'PM',
    },
    {
      title: 'BitSummit GameJam2025',
      category: 'team',
      description: 'プログラマ、Unity / C#、2025-04',
      url: 'https://github.com/void2610/bsgj2025-team5',
      stack: ['Unity', 'C#'],
      period: '2025-04',
      role: 'プログラマ',
    },
    {
      title: 'BitSummit GameJam 2023',
      category: 'team',
      description: 'PM / プログラマ、Unity / C#、2023-04',
      url: 'https://github.com/Usagisansesu/Gingaenzetsu',
      stack: ['Unity', 'C#'],
      period: '2023-04',
      role: 'PM / プログラマ',
    },
    {
      title: '京都イノベーションハッカソン',
      category: 'hackathon',
      description: 'メンバー / フロントエンド / スライド作成、2023-09',
      period: '2023-09',
      role: 'メンバー / フロントエンド / スライド作成',
    },
    {
      title: 'あまてく x PeachTechコラボハッカソン',
      category: 'hackathon',
      description: '2025-05',
      period: '2025-05',
    },
    {
      title: '関西ビギナーズハッカソンVol.2',
      category: 'hackathon',
      description: 'フロントエンド / メンバー / スライド作成、2023-08',
      period: '2023-08',
      role: 'フロントエンド / メンバー / スライド作成',
    },
    {
      title: '関西ビギナーズハッカソンVol.6',
      category: 'hackathon',
      description: 'フロントエンド / バックエンド / PM / デザイナー / スライド作成、2025-08',
      period: '2025-08',
      role: 'フロントエンド / バックエンド / PM / デザイナー / スライド作成',
    },
    {
      title: 'あまてく奈良ハッカソン2024春',
      category: 'hackathon',
      description: 'フロントエンド / メンバー / スライド作成 / デザイナー、2024-03',
      period: '2024-03',
      role: 'フロントエンド / メンバー / スライド作成 / デザイナー',
    },
    {
      title: '関西ビギナーズハッカソンVol.3',
      category: 'hackathon',
      description: 'フロントエンド / メンバー / スライド作成、2024-03',
      period: '2024-03',
      role: 'フロントエンド / メンバー / スライド作成',
    },
    {
      title: 'KC3Hack 2025',
      category: 'hackathon',
      description: 'フロントエンド / バックエンド / メンバー / デザイナー / スライド作成、2025-02',
      period: '2025-02',
      role: 'フロントエンド / バックエンド / メンバー / デザイナー / スライド作成',
    },
    {
      title: '魔法陣＝音楽アプリ（予定）',
      category: 'personal',
      description: '魔法陣＝音楽アプリ（予定）',
    },
    {
      title: '制御構文チェッカー',
      category: 'personal',
      description: 'Make / bash / build.xml',
      stack: ['Make', 'bash', 'build.xml'],
    },
    {
      title: 'カンバン形式タスク管理アプリ',
      category: 'personal',
      description: 'Node.js / Vue.js / Prettier / ESLint / vitest',
      stack: ['Node.js', 'Vue.js', 'Prettier', 'ESLint', 'vitest'],
    },
    {
      title: 'シンギング・グラス',
      category: 'personal',
      description: 'Arduino IDE / M5 Stack',
      stack: ['Arduino IDE', 'M5 Stack'],
    },
  ],
  // NOTION_SYNC_END: works

  // NOTION_SYNC_START: career
  // Notion DB「経歴」より同期。
  // 期間・役割・内容が Notion 側未入力の場合は TODO プレースホルダを保持。
  career: [
    {
      company: 'Degital Garage 3daysインターン',
      role: 'TODO: Notion「経歴」DB の「職種・役割」が未入力',
      period: 'TODO: Notion「経歴」DB の「時期」が未入力',
      description: 'TODO: 取り組んだ内容を 1〜2 文で。',
    },
    {
      company: 'Rakus TechLab. 3daysインターン',
      role: 'TODO: Notion「経歴」DB の「職種・役割」が未入力',
      period: 'TODO: Notion「経歴」DB の「時期」が未入力',
      description: 'TODO: 取り組んだ内容を 1〜2 文で。',
    },
  ],
  // NOTION_SYNC_END: career
}
