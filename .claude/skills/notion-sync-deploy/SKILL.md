---
name: notion-sync-deploy
description: Notion DBの内容をportfolio.tsに同期し、変更があればcommit → push → GitHub Pages自動デプロイを実行する。月次/手動で発動。
---

## 前提条件

- `.claude/settings.local.json` の `env` に以下が設定済み:
  - `NOTION_TOKEN`
  - `NOTION_DB_SKILLS`
  - `NOTION_DB_TEAM_WORKS`
  - `NOTION_DB_HACKATHON`
  - `NOTION_DB_PERSONAL`
  - `NOTION_DB_CAREER`

未設定の場合はスクリプトが即座にエラーを出して停止するので、メッセージに従って追記する。

## 実行内容

### Step 1: Notion 同期

```bash
cd frontend
npm run sync-notion
```

出力を確認:
- `sync-notion: 変更なし。スキップします。` → **ここで終了**（commit 不要）
- `sync-notion: portfolio.ts を更新しました` → Step 2 へ進む

### Step 2: lint + build + test ゲート

```bash
npm run lint
npm run build
npm test -- --run
```

いずれかが失敗したら停止し、`.claude/memory/test-failures-<date>.md` に出力を記録して Frontend チームに報告。

### Step 3: commit

```bash
cd ..
git add frontend/src/data/portfolio.ts
git commit -m "chore(content): sync portfolio from Notion $(date +%Y-%m-%d)"
```

### Step 4: push → 自動デプロイ

```bash
git push origin main
```

`main` への push で `.github/workflows/deploy.yml` が自動トリガーされ、GitHub Pages にデプロイされる。

## 成功条件

- `portfolio.ts` の動的セクション（skills / works / career）が最新の Notion データと一致している
- GitHub Actions の `deploy` ジョブが完了し、GitHub Pages の公開 URL で更新が反映されている

## 失敗時のフォールバック

| 失敗箇所 | 対応 |
|---------|------|
| NOTION_TOKEN 未設定 | `.claude/settings.local.json` の `env.NOTION_TOKEN` を追記 |
| Notion API 401 エラー | トークンの有効期限・スコープを Notion 側で確認 |
| Notion API 404 エラー | DB ID が正しいか、インテグレーションが DB に接続されているか確認 |
| プロパティ名不一致 | `frontend/scripts/sync-notion.ts` の `PROPS` 定数を Notion 側の実際の名前に合わせて修正 |
| lint / build 失敗 | 生成コードの構文エラー → `PROPS` マッピングの出力を確認し `genSkills` / `genWorks` / `genCareer` を修正 |
| push 失敗 (diverge) | `git pull --rebase origin main` してから再実行 |

## ロールバック

上書き前に `/tmp/portfolio-backup-<timestamp>.ts` にバックアップが保存される。
問題があれば:
```bash
cp /tmp/portfolio-backup-<timestamp>.ts frontend/src/data/portfolio.ts
```
