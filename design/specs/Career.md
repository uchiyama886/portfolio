# Career — Design Spec

ポートフォリオの最終セクション。`portfolio.career` の各エントリを **フラットな縦リスト** として表示する。Works のようなカテゴリ分けは行わない（職歴は単一の時系列だが、本サイトでは粒度が小さいので順序のみ portfolio.ts に従う）。

## 役割

- インターン・職務経験を新しい順 / portfolio.ts 配列順で簡潔に提示
- Works よりも軽量なカードで、CV の項目に近い読み心地

## レイアウト

- セクション上下 padding: `--space-7` (48px)
- 見出し（h2: "Career"）→ エントリリスト の縦並び
- 見出しとリストの間: `--space-5` (24px)
- エントリ間 gap: `--space-3` (12px)
- 1 エントリは「カード」スタイル（Works と統一感）：
  1. ヘッダ行: company（h3） — `url` があればリンク化＋末尾 `↗`
  2. メタ行: role と period を中黒区切りで併記（`role · period`）
  3. description（本文）

## エントリ仕様

- background: `--color-surface`
- border-radius: `--radius-md`
- padding: `--space-4`
- 内部要素間 gap: `--space-2` (8px)
- カード全体クリック可ではない（タイトルだけがリンク）— Works と同方針

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| heading (h2) | `font-size` | `var(--font-size-2xl)` |
| heading (h2) | `font-weight` | `var(--font-weight-semibold)` |
| heading (h2) | `color` | `var(--color-text)` |
| heading (h2) | `line-height` | `var(--line-height-tight)` |
| heading → リスト間 | `margin-block-start` (list 側) | `var(--space-5)` |
| list | `display` / `gap` | `flex-direction: column` / `var(--space-3)` |
| entry (card) | `background` | `var(--color-surface)` |
| entry (card) | `border-radius` | `var(--radius-md)` |
| entry (card) | `padding` | `var(--space-4)` |
| entry (card) | `gap` | `var(--space-2)` |
| company (h3) | `font-size` | `var(--font-size-lg)` |
| company (h3) | `font-weight` | `var(--font-weight-semibold)` |
| company (h3) | `color` | `var(--color-text)` |
| company (h3) | `line-height` | `var(--line-height-tight)` |
| company link color | `color` | `var(--color-text)`（globals 上書き、下線無し） |
| company link hover | `color` | `var(--color-link)` |
| meta (role · period) | `font-size` | `var(--font-size-sm)` |
| meta (role · period) | `color` | `var(--color-text-muted)` |
| meta period 部 | `font-family` | `var(--font-mono)` |
| meta separator (中黒) | `color` | `var(--color-text-muted)` |
| description | `font-size` | `var(--font-size-base)` |
| description | `color` | `var(--color-text)` |
| description | `line-height` | `var(--line-height-base)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出し: `<h2 id="career-heading">Career</h2>`、`<section aria-labelledby="career-heading">`
- 各エントリ company は `<h3>` で見出し階層 (h1 → h2 → h3) を維持
- リストは `<ul>` + `<li>`（順序付きではないが、配列順の保持を期待する）
- `url` のある entry: `<a href={url} target="_blank" rel="noreferrer noopener">` で company ラップ。`↗` は `aria-hidden="true"`
- meta の中黒 (`·`) は装飾的なので `aria-hidden="true"` 推奨（または span でラップしてスクリーンリーダーに「中黒」と読ませない）

## レスポンシブ

- 1 カラム縦リストのまま
- meta 行 (`role · period`) は折返しを許容（モバイル幅で role が長い場合）。改行されても可読性が保てる

## 視覚レビュー基準（Step 4 で参照）

1. h2 と h3（company）のサイズ差が明確か
2. meta 行の muted カラーで company と区別できているか
3. description の段落が密すぎ／開きすぎでないか
4. period に TODO 等の暫定値が入っていてもレイアウトが崩れないか
5. 1280px / 768px / 375px の 3 幅で破綻なし
