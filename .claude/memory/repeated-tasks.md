# 繰り返し作業ログ

`.claude/automation-policy.md` の §3 に従って、セッション開始/終了に行ったタスクを記録する。  
同一タスク × 同一タイミングが **3 回**に達したら自動化対象。

## ログ

| タスク名 | チーム | タイミング | 日付 | 補足 | 状態 |
|---------|--------|-----------|------|------|------|
| dev server 起動 + 視覚レビュー疎通 (curl) | frontend | end | 2026-05-07 | feature/initial-portfolio Step 4 で実行 | counting (1/3) |
| lint + build 連続実行 (push直前) | cicd | end | 2026-05-07 | feature/initial-portfolio で 2 回（初回レビュー時 / 再設計後） | counting (1/3) |
| compare URL 方式の PR 作成 (gh未導入) | cicd | end | 2026-05-07 | feature/initial-portfolio → main | counting (1/3) |
| compare URL 方式の PR 作成 (gh未導入) | cicd | end | 2026-05-07 | feature/icon-integration → main | counting (2/3) |
| compare URL 方式の PR 作成 (gh未導入) | cicd | end | 2026-05-07 | feature/add-readme → main | → automated: pr-open |
| lint + build 連続実行 (push直前) | cicd | end | 2026-05-07 | feature/icon-integration で実行 | counting (2/3) |
| lint + build 連続実行 (push直前) | cicd | end | 2026-05-07 | Phase 4 振り返り commit + push 前 | → automated: lint-build-push |
| 機能単位の 3 コミット分割 (design-CSS / design-spec+globals / frontend-types+JSX) | cicd | end | 2026-05-07 | チーム境界に対応する分割 | counting (1/3) |

## 自動化済み

| skill-name | 元タスク | チーム | タイミング | 自動化日 |
|------------|---------|--------|-----------|---------|
| `pr-open` | compare URL 方式の PR 作成 (gh未導入) | cicd | end | 2026-05-07 |
| `lint-build-push` | lint + build 連続実行 (push直前) | cicd | end | 2026-05-07 |

## 引退

| skill-name | 引退理由 | 日付 |
|------------|---------|------|
| | | |
