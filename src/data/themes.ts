// 사용자가 직접 고르는 '앱 전체' 컬러 테마
// accent 계열뿐 아니라 배경/서피스까지 은은하게 물들여 앱 전체 분위기를 바꾼다.
export interface Theme {
  id: string
  name: string
  accent: string
  soft: string
  ink: string
  bg: string // 앱 바탕
  surface2: string // 보조 표면
}

export const THEMES: Theme[] = [
  { id: 'terracotta', name: '테라코타', accent: '#c8613b', soft: '#f0d9cd', ink: '#8a3d1f', bg: '#f4efe7', surface2: '#faf6ef' },
  { id: 'sage', name: '세이지', accent: '#6f7a5a', soft: '#e4e8d8', ink: '#47503a', bg: '#eef1e8', surface2: '#f5f7ef' },
  { id: 'plum', name: '플럼', accent: '#7b5769', soft: '#efe1e9', ink: '#532f42', bg: '#f2ecef', surface2: '#f9f3f6' },
  { id: 'gold', name: '골드', accent: '#b58b3c', soft: '#f1e6cd', ink: '#7a5a1f', bg: '#f4efe3', surface2: '#faf6ea' },
  { id: 'ocean', name: '오션', accent: '#4d7c8a', soft: '#d7e6ea', ink: '#2f5661', bg: '#e9f0f1', surface2: '#f1f6f7' },
  { id: 'coral', name: '코랄', accent: '#d1687f', soft: '#f6dbe2', ink: '#9c3b52', bg: '#f6ecef', surface2: '#fcf4f6' },
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
