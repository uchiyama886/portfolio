# Hero — Design Spec

ポートフォリオの最初に表示される見出しブロック。`portfolio.hero` の `name` / `catchphrase` / 任意の `iconSrc` を表示する。

## 役割

- 訪問者がページを開いた最初に名前と一文の自己定義を伝える
- それ以外の情報（職歴・スキル等）は後続セクションへ委譲

## レイアウト

- 中央寄せ（縦・横とも）
- 横幅は親 `<main>` の `--layout-max-width: 720px` に従い、内側 padding は 0（globals の container が外側で確保）
- セクション上下 padding: `--space-7` (48px)
- 要素の縦並び: アイコン（あれば）→ name → catchphrase

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| icon size | `width`, `height` | `96px`（固定。レスポンシブ未対応） |
| icon shape | `border-radius` | `var(--radius-pill)` |
| icon → name 間 | `margin-block-start` (name に対して) | `var(--space-5)` |
| name | `font-size` | `var(--font-size-3xl)` |
| name | `font-weight` | `var(--font-weight-semibold)` |
| name | `color` | `var(--color-text)` |
| name | `line-height` | `var(--line-height-tight)` |
| name → catchphrase 間 | `margin-block-start` (catchphrase に対して) | `var(--space-3)` |
| catchphrase | `font-size` | `var(--font-size-base)` |
| catchphrase | `font-weight` | `var(--font-weight-regular)` |
| catchphrase | `color` | `var(--color-text-muted)` |
| catchphrase | `line-height` | `var(--line-height-base)` |

新規トークンの追加は不要（既存 tokens.css ですべて充足）。

## アクセシビリティ

- name は `<h1>`（ページ唯一の H1）
- 装飾アイコン（顔写真でない場合）は `alt=""` で付ける
- 顔写真の場合は `alt="<name>"` で付ける
- フォーカスリングは globals.css の `:focus-visible` に委ねる（個別指定不要）

## レスポンシブ

- モバイル幅でも特に縮小せず、padding と font-size をそのまま維持（Notion 風 narrow column が狭幅でも自然に収まる）
- 必要に応じて将来 `clamp()` 化を検討

## 視覚レビュー基準（Step 4 で参照）

1. アイコン未設定時に縦中央バランスが崩れないか
2. name と catchphrase の余白が密すぎ／開きすぎでないか
3. catchphrase の muted カラーが本文として読みにくくないか
4. 1280px / 768px / 375px の 3 幅で破綻がないか
