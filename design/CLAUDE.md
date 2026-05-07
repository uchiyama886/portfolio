# Design Team

> **作業フロー**: [`.claude/workflow.md`](./.claude/workflow.md) のステップ **2, 4** を担当。引き継ぎは書面ベース、user 経由でのみ。

## 1. WHAT — 何をするチームか

ポートフォリオサイトの **視覚デザイン全般** を担当。[Notion先行ポートフォリオ](https://www.notion.so/Uchiyama-Shotaro-s-Portfolio-24d126f1c809805a8f3bcfc25bb7aceb) のテイスト（白背景 + グレー callout カード + サンセリフ + 控えめなアクセント）を再現する。

成果物・カラーパレット・タイポ・ディレクトリ構成は [style-spec.md](./style-spec.md)。

要件定義は `design/specs/<component>.md` に書き、Frontend に commit 経由で引き継ぐ。

## 2. WHY — どのSkillをいつ使うか

| Skill | 使う基準 |
| --- | --- |
| `figma:figma-implement-design` | Figma にあるデザインをコードに 1:1 で落とし込む時 |
| `figma:figma-generate-design` | 実装済みページを Figma 上に再現する時（コード→Figma） |
| `figma:figma-create-design-system-rules` | プロジェクト固有のデザインルールを文書化する時 |
| `figma:figma-code-connect` | Figmaコンポーネント↔コードを紐付ける時 |
| `figma:figma-use` | Plugin API でノード生成・編集する時（必須前段） |
| `figma:figma-generate-diagram` | FigJam で図を作る時（必須前段） |

判断基準: Figma URL→`implement-design` / コード共有→`generate-design` / 規約導入→`create-design-system-rules`

## 3. HOW — 技術構成

- CSS Modules + CSS Custom Properties。プリプロセッサ不使用
- 全色・寸法は `tokens.css` の CSS 変数経由で参照（ハードコード禁止）
- `frontend/src/components/*.module.css` も書くが、必ずトークン経由で参照
- パレット・タイポ詳細: [style-spec.md](./style-spec.md)

## 4. 禁止事項

- `frontend/src/**/*.tsx` のロジック・JSX 構造の変更不可（CSSのみ可）
- `frontend/src/data/portfolio.ts` のコンテンツ変更不可（誤字でも要相談）
- `.github/workflows/` 配下の変更不可
- `vite.config.ts` / `package.json` / `tsconfig.json` の変更不可
- ピクセル値や16進カラーをコンポーネントCSSに直書きしない（必ずトークン経由）
- Figma 書き戻し時は `figma:figma-use` skill を必ず先読みし、対象ファイルキーを確認

---

## 5. 自動化ポリシー

[`/.claude/automation-policy.md`](../.claude/automation-policy.md) に従う。

- セッション開始/終了の作業を `.claude/memory/repeated-tasks.md` に1行追記（チーム欄: `design`）
- 同一作業×同一タイミングが **3回** → `.claude/skills/<name>/SKILL.md` 作成 + 下記に追記
- 対象例: `tokens.css` と各CSSの変数整合チェック、Figma 同期前差分確認、未使用トークン洗い出し

### 自動化済み Skill

<!-- 形式: `- <name> — <用途>。発動: セッション<開始|終了>。` -->

（まだなし）
