# プロジェクト作業フロー

各チーム（Frontend / Design / CI/CD）が並列で動き、**書面ベースの引き継ぎ**で連携する10ステップフロー。
このドキュメントは全チームの **唯一の真実 (single source of truth)** とし、各チームの CLAUDE.md からポインタされる。

## 起動方法

各チームは自分のディレクトリで Claude CLI を起動：

```bash
cd frontend && claude     # Frontend
cd design && claude       # Design
cd cicd && claude         # CI/CD
```

各チームディレクトリの `.claude/` は `../.claude/` へのシンボリックリンクなので、共有 settings / memory / skills / plans / workflow / automation-policy にアクセスできる。

## 10ステップフロー

| # | 担当 | 作業内容 | 完了条件・次への signal |
|---|------|---------|---------------------|
| 1 | （前提） | 全チームが自ディレクトリでCLI起動済み | 起動完了 |
| 2 | Design | コンポーネントのデザイン要件・トークン定義を作成 | `design/specs/<component>.md` + 必要に応じ `design/tokens.css` を commit |
| 3 | Frontend | Design 成果物を読みコンポーネントを実装 | `frontend/src/components/<Name>.tsx` を commit、`npm run build` 成功 |
| 4 | Design | Frontend 実装をレビュー | OK→ Step 5 / 修正あり→ Step 2（差分指摘を `design/specs/<component>.md` に追記） |
| 5 | CI/CD | lint / format / test を実行 | 全パス→ Step 7 / 失敗→ Step 6（`.claude/memory/test-failures-<date>.md` 作成） |
| 6 | Frontend | テストコード追加 / 修正 | 完了→ Step 4 へ戻る |
| 7 | CI/CD | リモートへ push (PR / main) | PR URL を user に伝達 |
| 8 | 全チーム | 得た知見を `.claude/memory/<topic>.md` に保存 | 各チーム最低1ファイル追加 |
| 9 | 全チーム | 使用した memory / Skills を評価し必要に応じて修正 | 評価結果を該当ファイルに追記 |
| 10 | 全チーム | ルーティン化可能な作業を `.claude/skills/` 配下に Skill 化 | `.claude/automation-policy.md` の3回ルール準拠 |

## 引き継ぎプロトコル（書面ベース）

| 引き継ぎ | 媒体 | 通知方法 |
|---------|------|---------|
| Design → Frontend (Step 2→3) | `design/specs/<component>.md` の commit | user に「@frontend 実装依頼」 |
| Frontend → Design (Step 3→4) | `frontend/src/components/<Name>.tsx` の commit | user に「@design レビュー依頼」 |
| Design → CI/CD (Step 4→5) | レビュー OK の合図 | user に「@cicd Step 5 開始」 |
| CI/CD → Frontend (Step 5→6) | `.claude/memory/test-failures-<date>.md` | user に「@frontend 修正依頼」 |
| Frontend → Design (Step 6→4) | テスト修正 commit | user に「@design 再レビュー依頼」 |

口頭やチャット相当の伝達は user を経由する。チーム間は **commit / memory ファイル** を介してのみ意思疎通する。

## チーム別ロール詳細

### Frontend (Step 3, 6)

- **Step 3**: `../design/specs/*.md` と `../design/tokens.css` を読む。`frontend/src/components/<Name>.tsx` + `<Name>.module.css` を実装。`npm run build` で検証。
- **Step 6**: `.claude/memory/test-failures-*.md` を読み、Vitest テストや実装を修正。

### Design (Step 2, 4)

- **Step 2**: `design/specs/<component>.md` にデザイン要件（レイアウト・状態・アクセシビリティ・トークン使用箇所）を記述。必要なら `design/tokens.css` を更新。Figma 連携時は figma スキルを使用。
- **Step 4**: 実装を視覚的にレビュー（dev server 起動 or スクショ）。修正点を `design/specs/<component>.md` に追記。

### CI/CD (Step 5, 7)

- **Step 5**: `npm run lint && npm run build && npm test -- --run` を実行。失敗時は失敗ログを `.claude/memory/test-failures-<date>.md` に書く。
- **Step 7**: `git push origin <branch>` → `gh pr create`。`main` への merge は user 許可後。

## ステップ 8-10 の運用

- **Step 8 (memory)**: トピック単位で `.claude/memory/<topic>.md` を新規作成 or 既存に追記。テンプレ:
  ```
  # <topic>
  - 学んだこと:
  - 失敗した点:
  - 次に活かす:
  ```
- **Step 9 (eval)**: 既存 memory / Skills を読み返し、陳腐化したものを更新 / 削除。引退時は `.claude/memory/repeated-tasks.md` の引退テーブルに記録。
- **Step 10 (routinize)**: `.claude/automation-policy.md` の §2 に従い、3回出現した作業を `.claude/skills/<name>/SKILL.md` 化。

## 例外

- 仕様の根本的な解釈違いは user 判断を仰ぐ
- 緊急の hotfix は Step 7 への直接スキップ可。事後に Step 8-9 で振り返る
- ステップを飛ばす場合は `.claude/memory/skipped-steps-<date>.md` に理由を記録
