# Frontend ↔ Design 協業の境界と再設計の影響範囲

日付: 2026-05-07
担当チーム: frontend

## 学んだこと

- Design チームが `frontend/src/components/*.module.css` を編集できる規約 (`design/CLAUDE.md` 4節) は、**JSX 構造を変えずに CSS だけで再デザインできる**設計のときに最大の効果を発揮した。Skills 再デザイン (commit 573e977) で、`Skills.tsx` の class 名が `groups / group / groupLabel / chipList / chip` のように **意味的な命名** であったため、Notion 風 multi-select 風レイアウトへの転換が CSS 1 ファイルだけで済んだ。
- 逆に level 軸へのグルーピング変更 (commit 0d90c76 → 9f40202) は、データモデル (`Skill.level`) の追加と React state（chip 選択）が必要になり、JSX/TS の書き換えが避けられなかった。これは Frontend が主導して再実装する案件。
- 判別基準: **コンテンツの並び方/見せ方の変更だけ → Design 単独で完結。データの軸が増える/インタラクションが追加される → Frontend が主導**。

## 失敗した点

- 当初 Skills は `category` 軸でグループ化していたが、視覚レビューで「スキルレベルがわかりづらい」と指摘されるまで level 軸の必要性に気付けなかった。**設計フェーズで「ユーザーが知りたい問い」を明文化していれば**（"何を使ったか" ではなく "どれくらい使えるか"）、後から軸を変える手戻りを避けられた。

## 次に活かす

- 新セクションの仕様を書くとき、`design/specs/<X>.md` の「役割」節に「このセクションが答える 1 つの問い」を一文で書く運用にする（Skills 再設計 spec の冒頭で実践済み）。
- class 名は実装詳細（`.flex-row`）ではなく意味（`.chipList`, `.relatedCard`）で命名する規約を継続。Design の越境編集を支える前提条件。
