# Links — Design Spec

GitHub / X / LinkedIn の 3 つの SNS リンクを **callout カード** として縦に並べる。Notion 先行ポートフォリオの灰色 callout（`color="gray_bg"`）を再現する。

## 役割

- Hero 直下に配置し、訪問者が最初に外部プロフィールに到達できる導線を提供
- 1 件 = 1 callout = 1 アンカーリンク（カード全体クリック可）

## レイアウト

- 縦リスト、3 件
- カード間ギャップ: `--space-3` (12px)
- セクション上下 padding: `--space-6` (32px)
- カード内: 横方向 flex、アイコン (24×24) + テキストブロック（label を上、handle を下に縦積み）
- カード内 padding: `--space-4` (16px)
- カード内アイコンとテキスト間: `--space-3` (12px)

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-6)` |
| list gap | `gap` | `var(--space-3)` |
| card background | `background` | `var(--color-surface)` |
| card hover background | `background` | `var(--color-surface-hover)` |
| card border-radius | `border-radius` | `var(--radius-md)` |
| card padding | `padding` | `var(--space-4)` |
| card text decoration | `text-decoration` | none（hover 時も） |
| card transition | `transition` | `background var(--transition-base)` |
| icon size | `width`, `height` | `24px` |
| icon color | `color` | `var(--color-text)` (`stroke`/`fill` は `currentColor`) |
| icon ↔ text gap | `gap` | `var(--space-3)` |
| label | `font-size` | `var(--font-size-base)` |
| label | `font-weight` | `var(--font-weight-semibold)` |
| label | `color` | `var(--color-text)` |
| handle | `font-size` | `var(--font-size-sm)` |
| handle | `color` | `var(--color-text-muted)` |
| handle | `font-family` | `var(--font-mono)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出し: `<h2>Links</h2>` を `visually-hidden` で配置（視覚的にはヘッダなしだが、見出しレベル順序を保つため）
- 各カードは `<a href="..." target="_blank" rel="noreferrer noopener">`
- アイコンは装飾扱いで `<svg aria-hidden="true">`、テキスト（label + handle）が読み上げ対象
- `:focus-visible` リングは globals.css の `--shadow-focus` がそのまま効く

## レスポンシブ

- 全幅で同じ縦リスト。モバイルでも 1 カラムを維持
- 横幅は親 `.container` の `--layout-max-width: 720px` 内
- 縮小しないシンプルな card

## 視覚レビュー基準（Step 4 で参照）

1. 3 カードが等間隔・等幅で並んでいる
2. カード内のアイコンとテキストの垂直中央揃えがズレていない
3. ホバー時の背景色変化が滑らかで、テキストが読みづらくならない
4. handle 部分の monospace が浮いて見えないか
