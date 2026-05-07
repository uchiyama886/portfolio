# Skills — Design Spec

About セクションに続くスキル一覧。`portfolio.skills` を **習熟度（level）別にグループ化** して表示し、チップをクリックすると関連する Work がミニカードとしてその場に展開される。

## 役割

- 言語 / ツール / OS 等の作者の技術スタックを「どれくらい使えるか」の軸で素早く伝える
- チップ単位で「このスキルで何を作ったか」を Works から逆引きできるようにする（Skills ↔ Works 連動）

## グループ定義（level）

`portfolio.skills[].level` の値と表示ラベルの対応：

| level 値 | 表示ラベル | 想定する内容 |
|---------|----------|-------------|
| `advanced`     | Advanced     | 業務 / 長期プロジェクトで主軸として使用 |
| `intermediate` | Intermediate | 個人開発やインターンで実装経験あり |
| `beginner`     | Beginner     | 学習中・授業で触った程度 |

順序: `advanced` → `intermediate` → `beginner`。各グループ内は `portfolio.skills` 配列の登場順を維持（ソートしない）。空グループは描画しない。

旧来の `category` フィールド（`language` / `tool` / `os`）は **データ上は残す**（将来の拡張余地）が、表示には用いない。

## レイアウト

- セクション上下 padding: `--space-7` (48px)
- 見出し（h2: "Skills"）→ グループ群 の縦並び
- 見出しと最初のグループ間: `--space-5` (24px)
- グループ間: `--space-4` (16px)
- **1 グループ = ラベル(h3) + チップ群 + 関連 Work エリア** の縦積み
  - ラベル → チップ群: `--space-2` (8px)
  - チップ群 → 関連 Work エリア: `--space-3` (12px)（選択時のみ表示）
- チップ群は flex-wrap、行内 gap `--space-2` (8px)

## チップ仕様

- shape: pill (`--radius-pill`)
- 要素: `<button type="button">`（クリッカブル）
- background: `--color-surface`
- text color: `--color-text`
- font-size: `--font-size-sm`
- padding: `--space-1` (4px) block / `--space-3` (12px) inline
- border: 0（hover/selected で表現）
- transition: background `var(--transition-fast)`, color `var(--transition-fast)`

### 状態

| 状態 | background | color |
|-----|-----------|-------|
| default      | `--color-surface`         | `--color-text` |
| hover        | `--color-surface-hover`   | `--color-text` |
| focus-visible| globals の focus-ring     | — |
| selected     | `--color-accent`          | `--color-bg`（白抜き） |
| selected:hover | `--color-link-hover`    | `--color-bg` |

選択は **同時に 1 つだけ**（再クリックで解除）。

## 関連 Work エリア

選択中のチップに対応する `Work` を、その level グループの下に展開する。

### マッチ規則

`Work.stack` 配列のいずれかが `Skill.name` と **大文字小文字を無視して一致** する Work を抽出。順序は `portfolio.works` の登場順を維持。

### ミニカード仕様

`Works.tsx` の本格カードと差別化した軽量カード：

- レイアウト: 縦積み（title / meta / 1行description）
- background: `--color-bg`
- border: `1px solid --color-border`
- border-radius: `--radius-sm`
- padding: `--space-3`
- 内部 gap: `--space-1`
- title: `--font-size-base` / semibold / `--color-text`、`url` あればリンク化（`↗` 装飾）
- meta（period があれば）: `--font-size-xs` / mono / `--color-text-muted`
- description: `--font-size-sm` / `--color-text-muted` / **1行 truncate**（`overflow: hidden; text-overflow: ellipsis; white-space: nowrap` または 2-line clamp）

リスト表示: `flex` `flex-direction: column` `gap: --space-2`。

### 空一致時

該当 Work が無い場合は muted のヒント文を 1 行表示：「このスキルに紐づく Work はまだ登録されていません。」

## トークン適用

| 要素 | プロパティ | 値（トークン） |
|------|-----------|---------------|
| section padding (block) | `padding-block` | `var(--space-7)` |
| heading (h2) | `font-size` | `var(--font-size-2xl)` |
| heading (h2) | `font-weight` | `var(--font-weight-semibold)` |
| heading → groups 間 | `margin-block-start` | `var(--space-5)` |
| group 間 | `gap` | `var(--space-4)` |
| group label (h3) | `font-size` | `var(--font-size-sm)` |
| group label (h3) | `font-weight` | `var(--font-weight-medium)` |
| group label (h3) | `color` | `var(--color-text-muted)` |
| group label (h3) | `letter-spacing` | `0.04em`（小キャプス的に） |
| chip list | `gap` | `var(--space-2)` |
| chip padding | `padding` | `var(--space-1) var(--space-3)` |
| related list | `gap` | `var(--space-2)` |
| related card padding | `padding` | `var(--space-3)` |
| related card border | `border` | `1px solid var(--color-border)` |
| related card title | `font-size` | `var(--font-size-base)` |
| related card meta | `font-size` | `var(--font-size-xs)` |
| related card description | `font-size` | `var(--font-size-sm)` |

新規トークンの追加は不要。

## アクセシビリティ

- セクション見出し: `<h2 id="skills-heading">Skills</h2>`、`<section aria-labelledby="skills-heading">`
- グループ小見出しは `<h3>`
- チップは `<button type="button">` で `aria-pressed={selected}` を付与
- 関連 Work エリアは `<div role="region" aria-live="polite">` で動的更新を読み上げ
- 選択時のみ表示される領域なので、aria-hidden ではなく単にレンダリングしない

## レスポンシブ

- ≥ 768px: 上記の通り
- < 768px: section padding-block を `--space-6` に圧縮、見出し font-size を `--font-size-xl` に
- < 480px: チップ font-size は維持、padding は `--space-1 --space-2` に縮小して密度を上げる

## 視覚レビュー基準（Step 4 で参照）

1. h2 と各 h3 の階層が視覚的に区別されているか
2. デフォルト時、3グループの密度がほぼ均一に並んでいるか
3. チップ選択時、accent color のチップが「押された」と一目でわかるか
4. 関連 Work ミニカードが Works セクションのカードと視覚的に区別され、混同しないか
5. 関連 Work エリア展開時にレイアウトジャンプが目立たないか
6. 1280px / 768px / 375px の 3 幅で破綻なし
