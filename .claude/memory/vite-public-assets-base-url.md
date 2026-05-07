# Vite public アセットと GitHub Pages base パスの扱い

日付: 2026-05-07
担当チーム: frontend

## 学んだこと

- `vite.config.ts` に `base: '/portfolio/'` が設定されている場合、`public/` 配下の静的ファイルは
  本番で `/portfolio/<filename>` に配置される。
- `<img src="/icon.png">` のようにハードコードすると dev では動くが GitHub Pages で 404 になる。
- 正しい書き方: `src={import.meta.env.BASE_URL + 'icon-character.png'}` — dev では `/`、本番では `/portfolio/` が自動で付く。
- `index.html` 内の OGP `og:image` は Vite の変換対象外なので、絶対 URL（`https://uchiyama886.github.io/portfolio/og-image.png`）をハードコードする必要がある。

## 失敗した点

- 最初の TODO コメントが `/icon-character.png`（絶対パス）を示唆していたが、そのままでは本番で `/portfolio/icon-character.png` に解決されない。

## 次に活かす

- `portfolio.ts` の `iconSrc` は常にファイル名のみ（`'icon-character.png'`）で保持し、Hero.tsx 側で `import.meta.env.BASE_URL +` を付ける運用を統一する。
- 新たな public アセット参照を書くときは必ず `BASE_URL` を経由する。
