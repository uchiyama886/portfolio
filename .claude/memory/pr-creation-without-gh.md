# gh CLI 未導入環境での PR 作成手順

日付: 2026-05-07
担当チーム: cicd

## 学んだこと

- このマシンには `gh` がインストールされておらず（`gh: command not found`）、CI/CD ワークフロー想定の `gh pr create` は使えない。代替として **GitHub の `compare/<base>...<head>?title=...&body=...&expand=1` URL を組み立てて user に渡す**方式が確実。
- URL 組み立ては Python の `urllib.parse.urlencode` でやるのが安全（タイトル/本文の `+` `#` `&` `%` などをすべてエスケープしてくれる）。HEREDOC で `<<'EOF'` を使うと **本文中のシングルクォートを含む文字列でシェルが落ちる**ことがあったので、`Write` で一時ファイルに書き出してから `git commit -F` を使うのが安全。
- push 前に必ず `git remote -v` と `git branch -vv` で remote と tracking ブランチを確認する。`-u` 付き push でトラッキング設定が初回に効く。

## 失敗した点

- 最初に `git commit -m "$(cat <<'EOF' ... EOF)"` で複数行コミットメッセージを書いたが、本文中の `'` の解釈で eval が落ちた。HEREDOC + `git commit -m` の組み合わせは脆い。

## 次に活かす

- 複数行コミットメッセージは `Write /tmp/commitN.txt` → `git commit -F /tmp/commitN.txt` で書く運用に統一。
- `gh` 未導入時は最初に検出して、URL 組み立てパスに即フォールバックする（user の待ち時間を削る）。
- `cicd/CLAUDE.md` 側に「gh 未導入時の PR URL 組み立てスニペット」を載せるのが筋（このプロジェクトでは未追記）。
