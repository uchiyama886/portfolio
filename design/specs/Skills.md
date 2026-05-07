# Skills — Design Spec

About セクションに続くスキル一覧。`portfolio.skills` の各 `{ name, category }` を **category 別にグループ化** して、Notion 風の pill チップで表示する。

## 役割

- 言語 / ツール / OS など作者の技術スタックを一覧で素早く伝える
- 並び順や粒度の重み付けは行わず（順位なし）、コレクションとして提示

## カテゴリ定義

`portfolio.skills[].category` の値と表示ラベルの対応：

| category 値 | 表示ラベル |
|------------|----------|
| `language` | Languages |
| `tool`     | Tools |
| `os`       | OS |
| (undefined) | Others |

カテゴリは上記の順序で表示する（`language` → `tool` → `os` → `Others`）。各カテゴリ内のスキルは `portfolio.skills` 配列の登場順を維持する（ソートしない）。

## レイアウト

- セクション上下 padding: `--space-7` (48px)
- 見出し（h2: "Skills"）→ カテゴリ群 の縦並び
- 見出しと最初のカテゴリ間: `--space-5` (24px)
- カテゴリ間: `--space-3` (12px) — Notion の multi-select 行のような密度
- **1 カテゴリ = 横 1 行**: ラベル（h3）が左、チップ群が右に並ぶ 2 カラム grid
  - grid-template-columns: `minmax(96px, max-content) 1fr`
  - align-items: `baseline`
  - column-gap: `--space-4` (16px)
- ラベルは inline / muted （Notion property name 風）
- チップ群は flex-wrap、行内 gap `--space-2` (8px)
- モバイル幅 (<480px): grid を解除し、ラベルの上にチップ群が縦積みになる

## チップ仕様

- shape: pill（`--radius-pill`）
- background: `--color-surface`
- text color: `--color-text`
- font-size: `--font-size-sm`
- padding: `--space-1` (4px) block / `--space-3` (12px) inline
- インタラクション無し（hover / focus 状態は持たない、リンクではない）

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| heading (h2) | `font-size` | `var(--font-size-2xl)` |
| heading (h2) | `font-weight` | `var(--font-weight-semibold)` |
| heading (h2) | `color` | `var(--color-text)` |
| heading (h2) | `line-height` | `var(--line-height-tight)` |
| heading → カテゴリ群間 | `margin-block-start` (groups 側) | `var(--space-5)` |
| カテゴリ間 | `gap` (groups の flex-column) | `var(--space-3)` |
| group | `display` | `grid` (`grid-template-columns: minmax(96px, max-content) 1fr`) |
| group | `align-items` | `baseline` |
| group | `column-gap` | `var(--space-4)` |
| 小見出し (h3) | `font-size` | `var(--font-size-sm)` |
| 小見出し (h3) | `font-weight` | `var(--font-weight-medium)` |
| 小見出し (h3) | `color` | `var(--color-text-muted)` |
| chip list | `display` / `gap` | `flex` + `flex-wrap: wrap` / `var(--space-2)` |
| chip background | `background` | `var(--color-surface)` |
| chip color | `color` | `var(--color-text)` |
| chip font-size | `font-size` | `var(--font-size-sm)` |
| chip padding | `padding` | `var(--space-1) var(--space-3)` |
| chip border-radius | `border-radius` | `var(--radius-pill)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出し: `<h2 id="skills-heading">Skills</h2>`、`<section aria-labelledby="skills-heading">` で関連付け
- カテゴリ小見出しは `<h3>` で見出し階層を維持（h1 → h2 → h3）
- チップ群はセマンティックには「リスト」なので `<ul>` + `<li>`
- カテゴリラベル（"Languages" 等）は文字列として読み上げる（装飾扱いにしない）

## レスポンシブ

- ≥ 480px: 横 grid（label | chips）を維持。chips は flex-wrap で自然に折返し
- < 480px: `grid-template-columns: 1fr` に切替え、ラベルの上にチップ群が縦積み（密度を保ったまま狭幅対応）
- font-size と padding は固定

## 視覚レビュー基準（Step 4 で参照）

1. h2 と各 h3（カテゴリ小見出し）の階層が視覚的に区別されているか
2. チップが詰まりすぎず、行間が読みやすいか
3. surface 背景のチップが white 背景上で「カードと混同」しないか
4. 1280px / 768px / 375px の 3 幅で破綻なし
