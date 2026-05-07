# Frontend Team

> **作業フロー**: [`.claude/workflow.md`](./.claude/workflow.md) のステップ **3, 6** を担当。引き継ぎは書面ベース、user 経由でのみ。

## 1. WHAT — 何をするチームか

React + Vite + TypeScript で `Uchiyama Shotaro's Portfolio` のアプリ本体を実装。GitHub Pages で静的ホスティングし、[Notion先行ポートフォリオ](https://www.notion.so/Uchiyama-Shotaro-s-Portfolio-24d126f1c809805a8f3bcfc25bb7aceb) 相当のコンテンツを再現。

実装する5セクション・ディレクトリ構成・コーディング規約は [implementation-spec.md](./implementation-spec.md)。

## 2. WHY — どのSkillをいつ使うか

| Skill | 使う基準 |
| --- | --- |
| `startup-test` | dev server (Vite:5173) 起動と画面表示の疎通確認。実装中・push前 |
| `integration-test` | Vitest 並列実行で回帰確認。コミット前・PR前 |
| `prod-start` | `npm run build` → `vite preview` の最終確認。デプロイ前 |
| `simplify` | コンポーネントの重複/責務肥大が見えた時。実装一段落時 |
| `review` | PR化直前のセルフレビュー |

判断基準: UI実装→`startup-test` / ロジック→`integration-test` / 完成→`simplify` / push直前→両test順実行

## 3. HOW — 技術構成

- React 18 / TypeScript / Vite / CSS Modules / Vitest + @testing-library/react
- ルーティング無し（縦スクロール1ページ）
- ディレクトリ構成・コーディング規約: [implementation-spec.md](./implementation-spec.md)

## 4. 禁止事項

- `design/` 配下の変更不可（Designチーム依頼）
- `.github/workflows/` 配下の変更不可（CI/CDチーム依頼）
- `vite.config.ts` の `base` 設定の独断変更不可（CI/CDチーム合意）
- UIライブラリ（MUI/Chakra等）追加は事前にDesignチーム相談
- 他チームのファイルを `git add` しない
- `package-lock.json` の意図的書き換え禁止（依存追加に伴う自然更新は可）

---

## 5. 自動化ポリシー

[`/.claude/automation-policy.md`](../.claude/automation-policy.md) に従う。

- セッション開始/終了の作業を `.claude/memory/repeated-tasks.md` に1行追記（チーム欄: `frontend`）
- 同一作業×同一タイミングが **3回** → `.claude/skills/<name>/SKILL.md` 作成 + 下記に追記
- 対象例: `npm install`、Vitest実行、dev server起動、UI確認、push前テスト

### 自動化済み Skill

<!-- 形式: `- <name> — <用途>。発動: セッション<開始|終了>。` -->

（まだなし）
