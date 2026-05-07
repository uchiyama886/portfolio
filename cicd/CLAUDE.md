# CI/CD Team

> **作業フロー**: [`.claude/workflow.md`](./.claude/workflow.md) のステップ **5, 7** を担当。引き継ぎは書面ベース、user 経由でのみ。

## 1. WHAT — 何をするチームか

ポートフォリオサイトの **ビルド / テスト / デプロイ自動化** を担当。`main` への push をトリガに GitHub Pages へ自動デプロイし、PR単位で build + test ゲートを設ける。

テスト失敗時は `.claude/memory/test-failures-<date>.md` に記録し、Frontend に再修正を依頼する。

**成果物**
- `.github/workflows/deploy.yml` / `.github/workflows/ci.yml`
- `vite.config.ts` の `base` 設定（公開URL直結部分のみ）
- リポジトリ Settings の Pages 構成手順

詳細仕様（workflow擬似コード、ブランチ戦略、Vite base 運用）: [workflows-design.md](./workflows-design.md)

## 2. WHY — どのSkillをいつ使うか

| Skill | 使う基準 |
| --- | --- |
| `pr-generator` | コミット差分から PR description を生成する時 |
| `review` | Workflow変更PRのセルフレビュー / 他チームPRのCI観点レビュー |
| `security-review` | Workflow に secret/token/permission を追加した時、サプライチェーン懸念のある依存追加時 |
| `update-config` | `.claude/settings.json` の hook / permission を整える時 |
| `fewer-permission-prompts` | permission prompt が頻発した時の許可リスト整理 |
| `integration-test` | CI が落ちた時の手元再現 |
| `startup-test` | Workflow 変更後の sanity check |

## 3. HOW — 技術構成

- **Actions**: `actions/checkout@v4`, `actions/setup-node@v4` (Node 20, npm cache内蔵), `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- **third-party Actions**: SHA ピン留め必須（`@v1` 不可）
- **シークレット**: `${{ secrets.* }}` 経由のみ。Workflow にハードコードしない
- **詳細な擬似コードとブランチ戦略**: [workflows-design.md](./workflows-design.md) 参照

## 4. 禁止事項

- `frontend/src/` 配下のアプリケーションコードを変更しない
- `design/` 配下のスタイル・トークンを変更しない
- `package.json` の `dependencies` を勝手に追加・更新・削除しない（CI専用 devDependencies は事前共有のうえ可）
- secrets / tokens を Workflow にハードコードしない
- `main` への force push、リリースタグ削除などの破壊的操作を行わない（実行前にユーザー確認）
- GitHub Pages Settings（公開ブランチ / カスタムドメイン）の独断変更不可

---

## 5. 自動化ポリシー

このチームは [`/.claude/automation-policy.md`](../.claude/automation-policy.md) に従う。

- セッション開始 / 終了で行った作業は `.claude/memory/repeated-tasks.md` に1行追記（チーム欄: `cicd`）
- 同一作業 × 同一タイミングが **3 回** で `.claude/skills/<skill-name>/SKILL.md` を作成し、下記に追記
- 自動化対象例: PR作成前の build+test 実行、`vite.config.ts` の base パス検証、actionlint、デプロイ後URLヘルスチェック

### 自動化済み Skill

<!-- 形式: `- <skill-name> — <用途>。発動: セッション<開始|終了>。` -->

- `pr-open` — gh 未導入環境で push 後の PR 作成 URL を抽出・提示する。発動: セッション終了 (Step 7)。
