# Works — Design Spec

Skills に続く制作物セクション。`portfolio.works` の各エントリを **category 別にグループ化** して、Notion 風のカードで一覧表示する。

## 役割

- チーム開発 / ハッカソン / 個人制作の 3 カテゴリで作品を提示
- タイトル・概要・使用技術・期間・参照 URL を 1 枚のカードで完結させる

## カテゴリ定義

`portfolio.works[].category` の値と表示ラベル：

| category 値 | 表示ラベル |
|------------|----------|
| `team`      | Team Projects |
| `hackathon` | Hackathons |
| `personal`  | Personal |

順序: `team` → `hackathon` → `personal`。各カテゴリ内は `portfolio.works` 配列の登場順を維持。空カテゴリは描画しない。

## レイアウト

- セクション上下 padding: `--space-7` (48px)
- 見出し（h2: "Works"）→ カテゴリ群 の縦並び
- 見出しと最初のカテゴリ間: `--space-5` (24px)
- カテゴリ間: `--space-6` (32px) — Skills より大きめ（カードがリッチなので呼吸感を確保）
- カテゴリ内: 小見出し（h3） + カードの縦リスト
- 小見出しとカード群の間: `--space-3` (12px)
- カード間 gap: `--space-3` (12px)

## カード仕様

カード内の縦並び：

1. ヘッダ行: title（h4） — `url` があれば title 全体をリンク化し、末尾に外部リンク矢印 `↗` を付与
2. メタ行: period（任意、muted・小フォント・mono）
3. description（本文）
4. stack チップ（任意・flex-wrap・小ピル）

カード自体の構造：

- background: `--color-surface`
- border-radius: `--radius-md`
- padding: `--space-4`
- 内部要素間 gap: `--space-2` (8px)
- リンクカード化はしない（中の title だけがリンク。カード全体クリック可ではない）— 以下理由：
  - stack チップに将来的にホバーや個別リンクを持たせる可能性があるため
  - Links セクション（カード全体リンク）とは役割を区別する

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| heading (h2) | `font-size` | `var(--font-size-2xl)` |
| heading (h2) | `font-weight` | `var(--font-weight-semibold)` |
| heading → カテゴリ群間 | `margin-block-start` (groups 側) | `var(--space-5)` |
| カテゴリ間 | `gap` | `var(--space-6)` |
| 小見出し (h3) | `font-size` | `var(--font-size-base)` |
| 小見出し (h3) | `font-weight` | `var(--font-weight-semibold)` |
| 小見出し (h3) | `color` | `var(--color-text-muted)` |
| 小見出し → カード群間 | `margin-block-start` (card list 側) | `var(--space-3)` |
| card list | `display` / `gap` | `flex-direction: column` / `var(--space-3)` |
| card | `background` | `var(--color-surface)` |
| card | `border-radius` | `var(--radius-md)` |
| card | `padding` | `var(--space-4)` |
| card 内部 gap | `gap` | `var(--space-2)` |
| title (h4) | `font-size` | `var(--font-size-lg)` |
| title (h4) | `font-weight` | `var(--font-weight-semibold)` |
| title (h4) | `color` | `var(--color-text)` |
| title (h4) | `line-height` | `var(--line-height-tight)` |
| title link color | `color` | `var(--color-text)`（globals の `a` 色を上書き、下線も無し） |
| title link hover | `color` | `var(--color-link)` |
| period | `font-size` | `var(--font-size-sm)` |
| period | `color` | `var(--color-text-muted)` |
| period | `font-family` | `var(--font-mono)` |
| description | `font-size` | `var(--font-size-base)` |
| description | `color` | `var(--color-text)` |
| description | `line-height` | `var(--line-height-base)` |
| stack list | `gap` | `var(--space-2)` |
| stack chip | `background` | `var(--color-bg)`（カードが surface なので白で抜く） |
| stack chip | `border` | `1px solid var(--color-border)` |
| stack chip | `font-size` | `var(--font-size-xs)` |
| stack chip | `padding` | `var(--space-1) var(--space-2)` |
| stack chip | `border-radius` | `var(--radius-pill)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出し: `<h2 id="works-heading">Works</h2>`、`<section aria-labelledby="works-heading">` で関連付け
- カテゴリラベルは `<h3>`、作品タイトルは `<h4>` — 階層 h1 → h2 → h3 → h4 を維持
- `url` のある作品: `<a href={url} target="_blank" rel="noreferrer noopener">` でタイトルをラップ。外部リンク矢印 `↗` は装飾として `aria-hidden="true"`
- stack チップは意味的なリストなので `<ul>` + `<li>`
- TODO プレースホルダの作品も視覚的には同じカードで表示する（コンテンツ確定前でも構造検証ができるように）

## レスポンシブ

- 縦リストのまま 1 カラムを維持
- カード内 padding と font-size は固定。stack チップは flex-wrap で自然折返し

## 視覚レビュー基準（Step 4 で参照）

1. h2 / h3 / h4 の 3 階層が視覚的に区別できているか
2. カードの surface 背景が About / Skills セクションの白背景と対比してカードと認識できるか
3. stack チップ（白背景＋border）が surface カード上で「カード in カード」として読めるか
4. title が長い場合に折り返して読みやすいか
5. period の monospace が浮きすぎていないか
6. 1280px / 768px / 375px の 3 幅で破綻なし
