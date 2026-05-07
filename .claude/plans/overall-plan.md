# 全体作業計画 — Uchiyama Shotaro's Portfolio

メタファイル整備が完了し、実装フェーズに入る前の総合計画。
`.claude/workflow.md` の10ステップフローを **Phase 2 のコンポーネントループ** に適用する。

## 0. 前提条件（user 判断が必要）

| 項目 | 必要な決定 | 既定案 |
|------|-----------|--------|
| GitHub リポジトリ名 | Vite の `base` 設定に直結 (`/<repo>/`) | `portfolio` を提案 |
| リモートリポジトリ作成有無 | 未作成なら user が GitHub 上で作成 | user が作成 |
| ブランチ戦略 | 初回構築は単一ブランチ vs コンポーネント毎 | 単一 `feature/initial-portfolio` を提案 |
| カスタムドメイン | あれば `base: '/'`、なければ `/<repo>/` | なし想定 |

---

## Phase 1: 基盤構築（一度きり / 各チーム1セッションずつ）

10ステップフローの **外側** で実施。並列可。

| # | チーム | 作業 | 成果物 |
|---|--------|------|--------|
| 1.1 | Frontend | Vite + React + TS scaffold (`npm create vite@latest`)、`src/data/portfolio.ts` 雛形作成 | `frontend/package.json`、`vite.config.ts`、`src/{main,App}.tsx`、空のcomponents/ |
| 1.2 | Design | `tokens.css` / `globals.css` の初期定義（style-spec.md のパレット・タイポをCSS変数化） | `design/tokens.css`、`design/globals.css`、`design/specs/` ディレクトリ |
| 1.3 | CI/CD | `vite.config.ts` の `base` 確定、`.github/workflows/{ci,deploy}.yml` 作成、Pages Settings 確認 | 2つの workflow yaml、Pages 公開準備完了 |

**完了の signal**: 3チームとも commit 済み、`main` で `npm run build` が成功する状態。

---

## Phase 2: コンポーネント開発（10ステップループ × 6コンポーネント）

### 対象コンポーネント

| 順序 | コンポーネント | 内容 |
|------|---------------|------|
| 1 | `Hero` | 名前・キャッチコピー・アイコン |
| 2 | `Links` | GitHub / X / LinkedIn の callout カード |
| 3 | `About` | 自己紹介本文（2カラム構造） |
| 4 | `Skills` | 言語・技術タグ |
| 5 | `Works` | チーム開発 / ハッカソン / 個人制作物の3カテゴリテーブル |
| 6 | `Career` | 職歴（インターン2件） |

### 1コンポーネントあたりの10ステップ実行

```
Step 2 [Design]    design/specs/<name>.md 作成 + 必要トークン追加
                ↓ commit + 「@frontend 実装依頼」
Step 3 [Frontend]  frontend/src/components/<Name>.tsx + .module.css 実装
                ↓ commit + npm run build 成功 + 「@design レビュー依頼」
Step 4 [Design]    視覚レビュー (dev server / スクショ)
                ↓ OK ━━━━━━━━━━━━━━━━━━━━━━━━━━┐
                ↓ NG → specs に差分追記 → Step 2 へ │
                                                    ↓
Step 5 [CI/CD]     lint / build / test 実行   ←━━━━┘ (3〜6コンポーネント単位でバッチ実行)
                ↓ パス ━━━━━━━━━━━━━━━━━━━━━━━┐
                ↓ 失敗 → memory/test-failures-*.md → Step 6 へ │
                                                    ↓
Step 6 [Frontend]  テスト追加 / 修正           ←━━┘
                ↓ → Step 4 へ戻る

Step 7 [CI/CD]     全コンポーネント完成後に `feature/initial-portfolio` を push + PR
```

### バッチ判断

- Step 5 (CI/CD 検証) は **3コンポーネントごと** に実施（Hero+Links+About → Skills+Works+Career）
- 全ループ通過後に Step 7 で1つの PR にまとめる

---

## Phase 3: 統合・初回デプロイ

| # | チーム | 作業 |
|---|--------|------|
| 3.1 | Frontend | `App.tsx` で6コンポーネントをレイアウトに統合 |
| 3.2 | Design | 全体レイアウトの最終調整（spacing, border, 全体感） |
| 3.3 | CI/CD | `main` への merge → `deploy.yml` 自動実行 → Pages URL で公開確認 |
| 3.4 | 全チーム | 公開 URL で動作確認（モバイル含む） |

---

## Phase 4: 振り返り（Step 8-10）

| # | チーム | 作業 |
|---|--------|------|
| 4.1 | 全チーム | 作業中の知見を `.claude/memory/<topic>.md` に保存（最低1ファイル/チーム） |
| 4.2 | 全チーム | 既存 memory / Skills を読み返し、陳腐化したものを更新 |
| 4.3 | 全チーム | 3回出現した作業を `.claude/skills/<name>/SKILL.md` 化（automation-policy 準拠） |
| 4.4 | user | 全体振り返り、次サイクル（追加コンポーネント・改善）の計画 |

---

## タイムライン目安（参考）

| Phase | 想定時間 |
|-------|---------|
| Phase 0 (準備) | 10分（user 判断） |
| Phase 1 (基盤) | 60-90分（3チーム並列） |
| Phase 2 (6コンポーネント) | 4-6時間（コンポーネント30-60分 × 6） |
| Phase 3 (統合・デプロイ) | 30-60分 |
| Phase 4 (振り返り) | 30分 |
| **合計** | **約 6-9時間** |

---

## リスクと user 確認ポイント

| リスク | 対応 |
|--------|------|
| `base` パス誤りで Pages 404 | Phase 1.3 で CI/CD が dev/prod 両方検証 |
| Design ↔ Frontend のレビュー往復が多発 | Phase 2 は最初の1コンポーネントで擦り合わせ、以降はテンプレ化 |
| GitHub Actions の secret 不足 | Phase 1.3 で CI/CD が事前に Pages 設定確認 |
| Notion 由来コンテンツの誤記 | Frontend が `src/data/portfolio.ts` 作成時に user 確認を取る |
| ブランチ運用の混乱 | 単一ブランチで開始、軌道に乗ってから細分化 |

---

## 次に user が決めること

1. GitHub リポジトリ名（`portfolio` でよいか？）
2. リモートリポジトリ作成（既存 or 新規？）
3. Phase 1 をどのチームから着手するか（並列推奨）
