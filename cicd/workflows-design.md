# Workflow & Branch Design (CI/CD詳細仕様)

cicd/CLAUDE.md からポインタされる詳細仕様。実装の参照用。

## ワークフロー設計

### `.github/workflows/ci.yml` — PR / push チェック

```yaml
on: [pull_request, push]
jobs:
  build-test:
    steps:
      - actions/checkout@v4
      - actions/setup-node@v4 (node-version: 20, cache: 'npm')
      - npm ci
      - npm run build
      - npm test -- --run
```

### `.github/workflows/deploy.yml` — main → GitHub Pages

```yaml
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    steps:
      - actions/checkout@v4
      - actions/setup-node@v4 (node-version: 20, cache: 'npm')
      - npm ci
      - npm run build
      - actions/configure-pages@v5
      - actions/upload-pages-artifact@v3 (path: frontend/dist)
  deploy:
    needs: build
    environment: github-pages
    steps:
      - actions/deploy-pages@v4
```

## Vite base 設定

- リポジトリ名が `<repo>` の場合: `vite.config.ts` で `base: '/<repo>/'`
- カスタムドメイン利用時: `base: '/'` に戻す
- 値の管理権はCI/CDチーム（公開URLに直結するため）

## ブランチ戦略

- `main`: 本番。直 push 不可、PR 経由のみ
- `feature/*`: 各チームの作業ブランチ
- マージ方式: Squash merge を推奨

## third-party Action のSHAピン留め

`actions/*` 以外の Action は `@<commit-sha>` で固定する。例:

```yaml
- uses: some-org/some-action@a1b2c3d4e5f6...  # v1.2.3
```

タグ参照（`@v1.2.3`）は将来書き換えられる可能性があるため避ける。
