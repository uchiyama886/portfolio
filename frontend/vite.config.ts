import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` は GitHub Pages デプロイ先 https://uchiyama886.github.io/portfolio/ に合わせる
// 変更時は CI/CD チームと合意すること（frontend/CLAUDE.md 禁止事項参照）
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
