# Uchiyama Shotaro's Portfolio

React + Vite + TypeScript で構築し、GitHub Pages で公開しているポートフォリオサイトです。

**Live:** https://uchiyama886.github.io/portfolio/

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

## Deploy

`main` ブランチへのマージで GitHub Actions が自動的にビルドし、GitHub Pages へデプロイします。
