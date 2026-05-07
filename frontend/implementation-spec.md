# Frontend 実装詳細

`frontend/CLAUDE.md` からポインタされる詳細仕様。実装前に参照する。

## 実装する5セクション

1. **ヒーロー / 自己紹介** — 京都産業大学 情報理工学部 情報理工学科、2027年卒、学生団体「あまてく」3代目代表
2. **SNSリンク** — GitHub: `uchiyama886` / X: `angleknock` / LinkedIn
3. **スキル** — Python, Java, JavaScript, TypeScript, HTML/CSS, PHP, SQL, GitHub/Git, C#(Unity), macOS
4. **制作物** — チーム開発 / ハッカソン / 個人制作物の3カテゴリ
5. **職歴** — Rakus TechLab. 3daysインターン / Degital Garage 3daysインターン

コンテンツの実体は `src/data/portfolio.ts` に集約（このチームが管理）。

## ディレクトリ構成（このチームが触るスコープ）

```
frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/        # UIコンポーネント (.tsx + .module.css)
│   │   ├── Hero.tsx
│   │   ├── Links.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Works.tsx
│   │   └── Career.tsx
│   ├── data/portfolio.ts  # 表示する全コンテンツ
│   └── __tests__/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts          # base パスは CI/CD チームと相談して決定
```

## コーディング規約

- 関数コンポーネント + named export を基本
- データはハードコードせず `src/data/portfolio.ts` に集約
- アクセシビリティ: 見出しレベル (h1→h2→h3) を守る、外部リンクは `rel="noreferrer"`
