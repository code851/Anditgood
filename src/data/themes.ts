// 사용자가 직접 고르는 앱 강조 컬러 테마
export interface Theme {
  id: string
  name: string
  accent: string
  soft: string
  ink: string
}

export const THEMES: Theme[] = [
  { id: 'terracotta', name: '테라코타', accent: '#c8613b', soft: '#f0d9cd', ink: '#8a3d1f' },
  { id: 'sage', name: '세이지', accent: '#6f7a5a', soft: '#e4e8d8', ink: '#47503a' },
  { id: 'plum', name: '플럼', accent: '#7b5769', soft: '#efe1e9', ink: '#532f42' },
  { id: 'gold', name: '골드', accent: '#b58b3c', soft: '#f1e6cd', ink: '#7a5a1f' },
  { id: 'ocean', name: '오션', accent: '#4d7c8a', soft: '#d7e6ea', ink: '#2f5661' },
  { id: 'coral', name: '코랄', accent: '#d1687f', soft: '#f6dbe2', ink: '#9c3b52' },
]

export function applyTheme(id: string) {
  const t = THEMES.find((x) => x.id === id) ?? THEMES[0]
  const root = document.documentElement
  root.style.setProperty('--accent', t.accent)
  root.style.setProperty('--accent-soft', t.soft)
  root.style.setProperty('--accent-ink', t.ink)
}
