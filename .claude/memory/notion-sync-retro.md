# Notion同期フェーズ振り返り

日付: 2026-05-09
担当: CI/CD チーム（全チーム参照可）

## 学んだこと

- Notion API のプロパティ名はワークスペースのDB設定に依存する。スクリプト作成後に実プロパティ名とのズレが発覚し、`PROPS` 定数の修正が必要だった（commit: `239eef4`）。
- `sync-notion.ts` は tsx で実行するため `package.json` の scripts に `tsx scripts/sync-notion.ts` として追加する必要がある。`ts-node` ではなく `tsx` を使うことで設定不要で動く。
- `test` スクリプトが未定義のまま `lint-build-push` Skill が `npm test -- --run` を呼ぶと exit 1 になる。今回はテストファイルが存在しないため実害なしだが、テスト導入時は先に script を定義する。

## 失敗した点

- Notion プロパティ名のずれを事前に確認せずスクリプトを書いた。実装前に `notion-fetch` 等でDB構造を確認するステップを挟むべきだった。
- `lint-build-push` Skill の test フェーズが `npm test` スクリプト必須を前提としており、未定義の場合にエラーになる。Skill 側で `npm run 2>&1 | grep -q test` で存在確認してからテストを実行するよう改善が望ましい。

## 次に活かす

- Notion連携スクリプト作成時は、実装前に対象DBのプロパティ名一覧を取得して `PROPS` 定数に反映してから実装する。
- `lint-build-push` Skill に `test` スクリプトの存在確認ステップを追加する（Skill 改善候補）。
- 月次自動実行（`/schedule` ルーティン）は認証情報設定後に別途セットアップが必要。README の手順を参照。
