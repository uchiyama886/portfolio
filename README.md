# Uchiyama Shotaro's Portfolio

Notionで作成したポートフォリオサイトを元にClaudeに再現させた実験リポジトリです。
React + Vite + TypeScript で構築し、GitHub Pages で公開しているので確認可能です。

**Live:** https://uchiyama886.github.io/portfolio/

**Source Notino Portfolio:** https://www.notion.so/Uchiyama-Shotaro-s-Portfolio-24d126f1c809805a8f3bcfc25bb7aceb

## Tech Stack

| 区分 | 技術 |
|------|------|
| フレームワーク | React 18 / TypeScript |
| ビルド | Vite |
| スタイル | CSS Modules + デザイントークン |
| テスト | Vitest + @testing-library/react |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

## Getting Started

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173/portfolio/
```

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run lint` | ESLint 実行 |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run sync-notion` | Notion DB からコンテンツを同期 |

## Project Structure

```
Case6/
├── frontend/          # React アプリ本体（src/, public/, index.html）
│   └── src/
│       ├── components/  # セクションコンポーネント（Hero, About, Skills, Works, Career, Links）
│       └── data/        # コンテンツデータ（portfolio.ts）
├── design/            # デザイントークン・グローバル CSS・仕様書
└── cicd/              # GitHub Actions ワークフロー設計ドキュメント
```

コンテンツは `frontend/src/data/portfolio.ts` に集約されており、Notion の各 DB（言語・技術 / 制作物 / 経歴）と定期同期しています。

## Notion 同期

Notion の各 DB（言語・技術 / チーム開発 / ハッカソン / 個人制作物 / 経歴）から `frontend/src/data/portfolio.ts` の動的セクションを自動更新するスクリプトを備えています。

### セットアップ

`.claude/settings.local.json`（gitignored）の `env` セクションに以下を追記してください。

```json
{
  "env": {
    "NOTION_TOKEN": "ntn_xxx",
    "NOTION_DB_SKILLS":     "（言語・技術 DB の ID）",
    "NOTION_DB_TEAM_WORKS": "（チーム開発 DB の ID）",
    "NOTION_DB_HACKATHON":  "（ハッカソン DB の ID）",
    "NOTION_DB_PERSONAL":   "（個人制作物 DB の ID）",
    "NOTION_DB_CAREER":     "（経歴 DB の ID）"
  }
}
```

**Notion トークンの取得**: https://www.notion.so/profile/integrations でインテグレーションを作成し、トークン（`ntn_xxx` 形式）をコピーします。各 DB にインテグレーションを接続した上で、DB URL 末尾の 32 文字（ハイフン除去）を ID として使います。

### 手動実行

```bash
cd frontend
npm run sync-notion
```

変更がなければ何もせず終了します。変更があれば `portfolio.ts` のマーカー間（skills / works / career）を上書きし、ロールバック用バックアップを `/tmp/` に保存します。

### 月次自動実行（/schedule）

Claude Code の `/schedule` コマンドで毎月1日に自動実行するリモートエージェントを設定できます。

```
/schedule
→「Create」を選択
→ Notion MCP を接続し、毎月1日 JST 9:00（cron: 0 0 1 * *）で設定
→ 実行内容: npm run sync-notion → 変更があれば commit → push → GitHub Pages 自動デプロイ
```

設定済みルーティンの確認・管理: https://claude.ai/code/routines

## Deploy

`main` ブランチへのマージで GitHub Actions が自動的にビルドし、GitHub Pages へデプロイします。
