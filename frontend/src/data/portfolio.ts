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
    // TODO: Notion ページアイコン (icon02_character_2048x2048.png) を frontend/public/ に
    // 配置後、'/icon-character.png' などのパスを設定。
    iconSrc: undefined,
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

  // Notion DB「言語・技術」より同期。
  // level マッピング: ⭐️5/4 → advanced, ⭐️3 → intermediate, ⭐️2/1 → beginner。
  // category は Notion 側の値（Frontend / Backend / Database / DevTools / Other）をそのまま使用。
  skills: [
    { name: 'Java', level: 'beginner', category: 'Backend' },
    { name: 'Python', level: 'beginner', category: 'Backend' },
    { name: 'JavaScript', level: 'intermediate', category: 'Frontend' },
    { name: 'TypeScript', level: 'intermediate', category: 'Frontend' },
    { name: 'HTML・CSS', level: 'beginner', category: 'Frontend' },
    { name: 'macOS', level: 'beginner', category: 'DevTools' },
    { name: 'PHP', level: 'beginner', category: 'Backend' },
    { name: 'GitHub・Git', level: 'beginner', category: 'DevTools' },
    { name: 'C#(Unity)', level: 'beginner', category: 'Other' },
    { name: 'SQL', level: 'beginner', category: 'Database' },
  ],

  // Notion DB「チーム開発」「ハッカソン」「個人制作物」より同期。
  // テンプレートの「新規ページ」と「シンギング・グラス」配下の制作過程サブページは除外。
  // stack の値は Skills.name と一致させると関連 Work として該当チップ選択時に表示される
  // （例: "C#(Unity)" / "HTML・CSS" の合体表記）。Notion 側の元 multi-select 値も併記。
  works: [
    // ─── チーム開発 ───
    {
      title: 'ウェーブレット変換アプリケーション',
      category: 'team',
      description:
        '授業課題として PM を担当。HTML / CSS / Python / Java / Shell を組み合わせて実装。',
      url: 'https://github.com/uchiyama886/ProjectPractice',
      stack: ['HTML・CSS', 'Python', 'Java', 'Shell'],
      period: '2024-09',
      role: 'PM',
    },
    {
      title: 'BitSummit GameJam 2023',
      category: 'team',
      description:
        '授業外のチーム制作。PM 兼プログラマとして Unity / C# でゲーム作品「Gingaenzetsu」を制作。',
      url: 'https://github.com/Usagisansesu/Gingaenzetsu',
      stack: ['C#(Unity)'],
      period: '2023-04 〜 2023-07',
      role: 'PM / プログラマ',
    },
    {
      title: 'BitSummit GameJam 2025',
      category: 'team',
      description:
        '授業外のチーム制作。プログラマとして Unity / C# でゲーム作品「konkoro」を制作。',
      url: 'https://github.com/void2610/bsgj2025-team5',
      stack: ['C#(Unity)'],
      period: '2025-04 〜 2025-07',
      role: 'プログラマ',
    },

    // ─── ハッカソン ───
    {
      title: 'KC3Hack 2025',
      category: 'hackathon',
      description:
        '関西の学生エンジニアが集う学外ハッカソン。フロントエンド / バックエンド / デザイナー / スライド作成を兼任。',
      url: 'https://github.com/kc3hack/2025_2',
      period: '2025-02-09 〜 2025-02-24',
      role: 'メンバー (FE / BE / Design / Slides)',
    },
    {
      title: '京都イノベーションハッカソン',
      category: 'hackathon',
      description:
        '学外ハッカソンに参加。フロントエンドとスライド作成を担当。',
      url: 'https://github.com/ReiwaPonpoco/KIH_hackathon',
      period: '2023-09-09 〜 2023-09-10',
      role: 'メンバー (FE / Slides)',
    },
    {
      title: 'あまてく x PeachTech コラボハッカソン',
      category: 'hackathon',
      description:
        '学生団体「あまてく」と PeachTech との合同イベントにメンターとして参加。',
      url: 'https://x.com/PeachTech_0927/status/1921918280727445748',
      period: '2025-05-12 〜 2025-05-25',
      role: 'メンター',
    },
    {
      title: 'あまてく奈良ハッカソン 2024 春',
      category: 'hackathon',
      description:
        'あまてく主催の団体内ハッカソンに参加。フロントエンド / デザイナー / スライド作成を担当。',
      url: 'https://github.com/K-Ryo-ta/narahackathon',
      period: '2024-03-18 〜 2024-03-19',
      role: 'メンバー (FE / Design / Slides)',
    },
    {
      title: '関西ビギナーズハッカソン Vol.6',
      category: 'hackathon',
      description:
        'チーム PM として学外ハッカソンに参加。フロントエンド / バックエンド / デザインも兼任。',
      url: 'https://github.com/uchiyama886/KBH2025_TEAM05',
      period: '2025-08-27 〜 2025-08-29',
      role: 'PM (FE / BE / Design / Slides)',
    },
    {
      title: '関西ビギナーズハッカソン Vol.2',
      category: 'hackathon',
      description:
        '学外ハッカソンに参加。フロントエンドとスライド作成を担当。',
      url: 'https://github.com/yuta925/SpeakerCheck',
      period: '2023-08-25 〜 2023-08-28',
      role: 'メンバー (FE / Slides)',
    },
    {
      title: '関西ビギナーズハッカソン Vol.3',
      category: 'hackathon',
      description:
        '学外ハッカソンに参加。フロントエンドとスライド作成を担当。',
      url: 'https://github.com/SEKI-YUTA/BeginnersHackathon2024_Spring',
      period: '2024-03-08 〜 2024-03-11',
      role: 'メンバー (FE / Slides)',
    },

    // ─── 個人制作 ───
    {
      title: 'シンギング・グラス',
      category: 'personal',
      description:
        'Arduino IDE と M5 Stack を用いた IoT プロトタイピング作品。圧力センサー実験から音響連携まで段階的に検証し、複数層のプロトタイピング過程を記録。',
      url: 'https://www.notion.so/2cd126f1c8098004bd5bea6d055ddbc1',
      stack: ['Arduino IDE', 'M5 Stack'],
      period: '2025-10 〜 2026-03',
    },
    {
      title: 'カンバン形式タスク管理アプリ',
      category: 'personal',
      description:
        'Vue.js / Node.js でカンバン UI を実装した個人制作物。Prettier / ESLint / vitest を導入し、フロントの品質基盤を素振り。',
      stack: ['Node.js', 'Vue.js', 'Prettier', 'ESLint', 'vitest'],
      period: '2025-07-24 〜 2025-07-30',
    },
    {
      title: '魔法陣＝音楽アプリ（予定）',
      category: 'personal',
      description:
        '魔法陣の図形操作と音楽再生を組み合わせたアプリ（構想段階）。',
    },
    {
      title: '制御構文チェッカー',
      category: 'personal',
      description:
        'プログラムの制御構文を静的に検査するユーティリティ。Make / bash / Ant (build.xml) で構成。',
      stack: ['Make', 'bash', 'build.xml'],
      period: '2025-12-27',
    },
  ],

  // Notion DB「経歴」より同期。
  // 期間と職種・役割の列は Notion 側に値が入っていなかったため TODO のまま残置。
  career: [
    {
      company: 'Digital Garage',
      role: '3days サマーインターン',
      period: 'TODO: Notion「経歴」DB の「時期」が未入力',
      description: 'TODO: 取り組んだ内容を 1〜2 文で。',
    },
    {
      company: 'Rakus TechLab.',
      role: '3days サマーインターン',
      period: 'TODO: Notion「経歴」DB の「時期」が未入力',
      description: 'TODO: 取り組んだ内容を 1〜2 文で。',
    },
  ],
}
