---
name: pr-open
description: gh が未導入の環境で feature ブランチを push した後に PR を開く。セッション終了 (Step 7) で毎回実行する。
---

## 実行内容

1. `git push origin <branch>` を実行する（push 出力に PR 作成 URL が含まれる）
2. push 出力から `https://github.com/.../pull/new/<branch>` の行を抽出してユーザーに提示する

```bash
git push origin <branch> 2>&1 | grep -o 'https://github.com[^ ]*'
```

3. 抽出できない場合は以下の URL を組み立てて提示する：

```
https://github.com/uchiyama886/portfolio/compare/<branch>?expand=1
```

## 成功条件

- ユーザーが URL をブラウザで開き、PR フォームが表示される

## 失敗時のフォールバック

- push 出力に URL が含まれない場合は `compare/<branch>?expand=1` 形式 URL を手動で組み立てて提示する
- `gh` が導入されていれば `gh pr create` に切り替える（`which gh` で確認）
