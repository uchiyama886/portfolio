# Project-local Skills

このディレクトリには、`.claude/automation-policy.md` のルールに従って自動生成された **このプロジェクト専用の Skill** が置かれる。

## 配置規約

```
.claude/skills/
└── <skill-name>/
    ├── SKILL.md              # YAML frontmatter + 実行手順
    └── scripts/              # （任意）ヘルパースクリプト
        └── *.sh, *.ts, *.py
```

## SKILL.md テンプレート

```markdown
---
name: <skill-name>
description: いつ使うか。"when X happens" の when 句で具体的に書く。
---

## 実行内容

1. <ステップ1>
2. <ステップ2>

## 成功条件

- <この出力 / 状態が満たされたら成功>

## 失敗時のフォールバック

- <成功条件を満たさない場合の対応>
```

## 命名規則

- ケバブケース（例: `auto-startup-check`, `pre-deploy-validate`）
- プレフィクスでタイミングが分かるように：`auto-` (session start) / `pre-deploy-` / `post-merge-` 等
