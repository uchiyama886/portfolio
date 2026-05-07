---
name: lint-build-push
description: push 直前に lint → build → test を連続実行してゲートチェックする。Step 5 / Step 7 直前のセッション終了時に発動。
---

## 実行内容

`frontend/` ディレクトリで以下を順に実行する。いずれかが失敗したら即停止し、失敗ログを `.claude/memory/test-failures-<date>.md` に書く。

```bash
cd frontend
npm run lint      # ESLint チェック
npm run build     # Vite production build
npm test -- --run # Vitest（watch モードなし）
```

## 成功条件

- 3コマンドすべてが exit 0
- `dist/` に成果物が生成されている

## 失敗時のフォールバック

| 失敗箇所 | 対応 |
|---------|------|
| lint | 自動修正可能なら `npm run lint -- --fix` を試みる。修正不能なら Frontend チームに報告 |
| build | TypeScript エラーが主因。`.claude/memory/test-failures-<date>.md` に出力を記録し `@frontend` に依頼 |
| test | 失敗テストのスタックトレースを `.claude/memory/test-failures-<date>.md` に記録し `@frontend` に依頼 |

## 使い方

CI/CD チームがセッション終了 (Step 5 / Step 7 直前) に `Skill("lint-build-push")` で呼び出す。
手作業では以下を順番に実行してもよい（Skill 化されているので原則 Skill 経由）。
