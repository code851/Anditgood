// 사용자가 직접 고르는 '앱 전체' 컬러 테마 — 그림책 수채 톤(따뜻한 파스텔)
export interface Theme {
  id: string
  name: string
  accent: string
  soft: string
  ink: string
  bg: string
  surface2: string
}

export const THEMES: Theme[] = [
  { id: 'apricot', name: '살구', accent: '#e8734a', soft: '#f8ddca', ink: '#b0512c', bg: '#f7f1e6', surface2: '#fbf5ea' },
  { id: 'sage', name: '세이지', accent: '#8fa771', soft: '#e3e9d3', ink: '#5c6f45', bg: '#f1f2e7', surface2: '#f7f8ee' },
  { id: 'mustard', name: '머스터드', accent: '#dda63f', soft: '#f5e7c1', ink: '#97671b', bg: '#f6f1e3', surface2: '#fbf6ea' },
  { id: 'dustyblue', name: '더스티블루', accent: '#6f88ab', soft: '#dce4ef', ink: '#435a7d', bg: '#edf0f4', surface2: '#f4f7fb' },
  { id: 'rose', name: '로즈', accent: '#d5847f', soft: '#f3d9d3', ink: '#a5544f', bg: '#f6ede9', surface2: '#fbf4f1' },
  { id: 'lilac', name: '라일락', accent: '#9481b0', soft: '#e6e0f0', ink: '#5f4f7e', bg: '#f0edf4', surface2: '#f7f4fb' },
]

export function applyTheme(id: string) {
  const t = THEMES.find((x) => x.id === id) ?? THEMES[0]
  const root = document.documentElement
  root.style.setProperty('--accent', t.accent)
  root.style.setProperty('--accent-soft', t.soft)
  root.style.setProperty('--accent-ink', t.ink)
  root.style.setProperty('--bg', t.bg)
  root.style.setProperty('--surface-2', t.surface2)
}
