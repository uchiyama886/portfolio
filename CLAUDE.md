# Case6 — Uchiyama Shotaro's Portfolio

React + Vite + TypeScript 製のポートフォリオサイトを **GitHub Pages** で公開するプロジェクト。
3チーム（Frontend / Design / CI/CD）が **担当ディレクトリだけを編集** する原則で並列開発する。

## 起動と作業フロー

各チームは自ディレクトリで Claude CLI を起動（`cd frontend && claude` 等）。各 `<team>/.claude` は `../.claude` への symlink で shared 設定を共有する。

10ステップの作業フロー全体・引き継ぎプロトコル: [`.claude/workflow.md`](./.claude/workflow.md)
担当ステップ: Design **(2,4)** → Frontend **(3,6)** → CI/CD **(5,7)** → 全チーム振り返り **(8-10)**

## ディレクトリ構造

```
Case6/
├── CLAUDE.md                       本ファイル（コードベースの地図）
├── frontend/                       Reactアプリ本体（src/, package.json, vite.config.ts）
│   ├── CLAUDE.md                   Frontendチームの指示
│   └── implementation-spec.md      5セクション・ディレクトリ・コーディング規約の詳細
├── design/                         デザイントークン・グローバルCSS
│   ├── CLAUDE.md                   Designチームの指示
│   └── style-spec.md               カラーパレット・タイポ・ディレクトリ構成の詳細
├── cicd/                           GitHub Actions workflow とデプロイ運用
│   ├── CLAUDE.md                   CI/CDチームの指示
│   └── workflows-design.md         Workflow擬似コード・ブランチ戦略の詳細
└── .claude/                        Claude Code 設定・自動化基盤（各チームから symlink 経由で参照）
    ├── settings.json               プロジェクト共通の許可/拒否/環境変数/worktree最適化
    ├── settings.local.json         個人MCP allow（gitignored）
    ├── workflow.md                 10ステップ作業フロー・引き継ぎプロトコル
    ├── automation-policy.md        繰り返し作業を3回で自動化するルール
    ├── memory/                     プロジェクト固有メモリ（repeated-tasks.md, test-failures-*.md 等）
    ├── skills/                     プロジェクト固有Skill（自動化されたもの）
    └── plans/                      実装プラン・調査メモ
```

`frontend/.claude` / `design/.claude` / `cicd/.claude` はいずれも `../.claude` への symlink。各チームから launched された Claude CLI が同一の設定・メモリを共有する。

## チーム別の詳細指示（プログレッシブ・ディスクロージャー）

各チームで作業する場合は、対応するサブディレクトリの CLAUDE.md を参照する。各 CLAUDE.md は60行未満に保ち、詳細仕様は同階層の `*-spec.md` / `workflows-design.md` に分離されている。

| チーム | 指示 | 詳細仕様 | 主担当 |
| --- | --- | --- | --- |
| Frontend | [frontend/CLAUDE.md](./frontend/CLAUDE.md) | [implementation-spec.md](./frontend/implementation-spec.md) | React/TS実装、テスト、UI |
| Design | [design/CLAUDE.md](./design/CLAUDE.md) | [style-spec.md](./design/style-spec.md) | トークン、CSS、Figma連携 |
| CI/CD | [cicd/CLAUDE.md](./cicd/CLAUDE.md) | [workflows-design.md](./cicd/workflows-design.md) | Actions、Pages、PR運用 |

## 横断ルール

- **担当外ファイルを変更しない**。境界は各チーム CLAUDE.md の「禁止事項」で明示。
- **自動化ポリシー**: [.claude/automation-policy.md](./.claude/automation-policy.md) に従い、繰り返し作業を Skill 化する。
- **権限設定**: [.claude/settings.json](./.claude/settings.json) で許可/拒否/`ask` を一元管理。`.env` と秘密鍵は読み書き共に deny。
- **コミット時の注意**: 自分の担当外（他チームのファイル）を `git add` に含めない。

## 参照元

先行ポートフォリオ（コンテンツ・デザインの参考）: [Notion](https://www.notion.so/Uchiyama-Shotaro-s-Portfolio-24d126f1c809805a8f3bcfc25bb7aceb)
