# Design 詳細仕様

`design/CLAUDE.md` からポインタされる詳細仕様。トークン定義・スタイル基盤の参照元。

## カラーパレット（Notion風）

| 用途 | 値 | 想定変数名 |
| --- | --- | --- |
| 背景 | `#ffffff` | `--color-bg` |
| テキスト主 | `#37352f`（Notion本文色相当） | `--color-text` |
| テキスト副 | `#787774` | `--color-text-muted` |
| callout背景 | `#f7f6f3` | `--color-surface` |
| 罫線 | `#e9e9e7` | `--color-border` |
| アクセント | `#2383e2`（リンク・ホバー） | `--color-accent` |

## タイポグラフィ

- ベース: `-apple-system, "Helvetica Neue", "Hiragino Sans", "Noto Sans JP", sans-serif`
- 見出し: 600 weight
- 本文: 400 weight
- 行間: 1.6

## ディレクトリ構成（このチームが触るスコープ）

```
design/
├── tokens.css            # CSS変数定義（color, spacing, radius, font）
├── globals.css           # reset, body, layout primitives
├── CLAUDE.md
├── style-spec.md         # 本ファイル
└── figma/                # （任意）エクスポート、Code Connect ファイル
    └── *.figma.ts
```

## 成果物の一覧

1. デザイントークン (`design/tokens.css`)
2. グローバルスタイル (`design/globals.css` ：reset, base, layout primitives)
3. コンポーネント単位の `.module.css` (`frontend/src/components/*.module.css`)
4. （オプション）Figma 上のスクリーン定義 / Code Connect マッピング
