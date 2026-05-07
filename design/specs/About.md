# About — Design Spec

Hero / Links に続く自己紹介セクション。`portfolio.about` の `affiliation`（所属）と `paragraphs`（自己紹介本文の配列）を表示する。

## 役割

- 訪問者に作者の所属と人物像（活動・関心領域）を簡潔に伝える
- Notion 先行ポートフォリオの「自己紹介」見出しブロック相当を再現

## レイアウト

- セクション上下 padding: `--space-7` (48px) — Hero と同じく独立感を出す
- 見出し（h2: "About"）→ affiliation（小さめ・muted）→ paragraphs（本文）の縦並び
- 見出しと affiliation の間: `--space-4` (16px)
- affiliation と最初の paragraph の間: `--space-4` (16px)
- 段落同士の間: `--space-3` (12px)
- 横幅は親 `.container` の `--layout-max-width: 720px` に従う
- テキストはすべて左揃え（Hero の中央寄せとはコントラストを持たせる）

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| heading (h2) | `font-size` | `var(--font-size-2xl)` |
| heading (h2) | `font-weight` | `var(--font-weight-semibold)` |
| heading (h2) | `color` | `var(--color-text)` |
| heading (h2) | `line-height` | `var(--line-height-tight)` |
| heading → affiliation 間 | `margin-block-start` (affiliation 側) | `var(--space-4)` |
| affiliation | `font-size` | `var(--font-size-sm)` |
| affiliation | `color` | `var(--color-text-muted)` |
| affiliation | `line-height` | `var(--line-height-base)` |
| affiliation → 本文間 | `margin-block-start` (paragraphs 1件目) | `var(--space-4)` |
| paragraph | `font-size` | `var(--font-size-base)` |
| paragraph | `color` | `var(--color-text)` |
| paragraph | `line-height` | `var(--line-height-base)` |
| 段落間 | `margin-block-start` (2件目以降) | `var(--space-3)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出しは `<h2 id="about-heading">About</h2>`、`<section aria-labelledby="about-heading">` で関連付け
- 見出しレベル順序を遵守（Hero h1 → About h2）
- affiliation は装飾的でなく意味的情報なので、通常の `<p>` で記述（`visually-hidden` 不要）
- 段落は `<p>` で配列を順序通り出力

## レスポンシブ

- モバイル幅でも縦積みのまま。font-size と padding を維持
- 必要に応じて将来 `clamp()` 化を検討

## 視覚レビュー基準（Step 4 で参照）

1. h2 が Hero の h1 と視覚的階層が崩れず、明確に小さい
2. affiliation の muted カラーで本文との視覚差が出ているか
3. 段落間の余白が密すぎ／開きすぎでないか
4. 1280px / 768px / 375px の 3 幅で破綻がないか
