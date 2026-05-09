# Project memory

プロジェクト固有のメモリ置き場。`.claude/automation-policy.md` の運用に必要なログ・メモを格納する。

## 含まれるファイル

- `repeated-tasks.md` — セッション開始/終了で繰り返された作業のカウンタ。自動化判定の元データ。
- `frontend-jsx-tokens-collab.md` — Frontend と Design の協業境界。意味的 class 名がもたらした効果と限界（2026-05-07）
- `responsive-scale-strategy.md` — 720px narrow column の落とし穴と 2 段ブレークポイント方針（2026-05-07）
- `pr-creation-without-gh.md` — gh 未導入環境で PR を作るための compare URL 組み立て手順（2026-05-07）
- `vite-public-assets-base-url.md` — Vite public アセットと GitHub Pages base パスの正しい参照方法（2026-05-07）
- `phase4-retro.md` — Phase 4 振り返り。memory 整理・Skill 化の判断基準と知見（2026-05-07）
- `notion-sync-retro.md` — Notion同期フェーズ振り返り。プロパティ名ズレの原因と lint-build-push Skill 改善候補（2026-05-09）

## ルール

- ユーザーの個人プロファイルや横断的な学びは、ユーザー側のグローバルメモリ（`~/.claude/projects/.../memory/`）に置く。ここはあくまで **このプロジェクト** に閉じた事実のみ。
- 各エントリは「いつ書かれたか」が分かるよう日付を含めること。
