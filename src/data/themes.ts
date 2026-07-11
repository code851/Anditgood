// 앱 전체 컬러 테마 — 다채로운 그림책 파스텔 프리셋 + 사용자 커스텀 색.
// 어떤 accent 색을 골라도 배경/서피스/텍스트가 조화롭게 자동 파생된다.

export interface ThemeVars {
  accent: string
  soft: string
  ink: string
  bg: string
  surface2: string
}

export interface Preset extends ThemeVars {
  id: string
  name: string
}

// ── 색 계산 유틸 ──
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const n =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
}
function toHex(n: number): string {
  return Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0')
}
function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
// a → b 로 t(0~1) 만큼 혼합
function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t)
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  const l = (max + min) / 2
  const d = max - min
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return [h, s, l]
}
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

const CREAM = '#f7f1e6'

// accent 하나로 조화로운 테마 변수 5종 파생
export function deriveVars(accent: string): ThemeVars {
  const [h, s] = rgbToHsl(...hexToRgb(accent))
  return {
    accent,
    soft: mix(accent, '#ffffff', 0.8), // 연한 틴트
    surface2: mix(accent, '#ffffff', 0.92),
    bg: mix(accent, CREAM, 0.9), // 크림에 살짝 물든 배경
    ink: hslToHex(h, Math.min(Math.max(s, 0.25), 0.6), 0.3), // 같은 색상의 진한 텍스트
  }
}

// ── 프리셋 (다채로운 그림책 톤) ──
const ACCENTS: { id: string; name: string; hex: string }[] = [
  { id: 'apricot', name: '살구', hex: '#e8734a' },
  { id: 'tomato', name: '토마토', hex: '#d9553f' },
  { id: 'coral', name: '코랄', hex: '#e2836f' },
  { id: 'carrot', name: '당근', hex: '#e0913c' },
  { id: 'mustard', name: '머스터드', hex: '#dda63f' },
  { id: 'butter', name: '버터', hex: '#cbb84e' },
  { id: 'olive', name: '올리브', hex: '#9a9c52' },
  { id: 'sage', name: '세이지', hex: '#8fa771' },
  { id: 'forest', name: '포레스트', hex: '#5f8a63' },
  { id: 'mint', name: '민트', hex: '#5fae98' },
  { id: 'teal', name: '틸', hex: '#4c9aa0' },
  { id: 'dustyblue', name: '더스티블루', hex: '#6f88ab' },
  { id: 'sky', name: '스카이', hex: '#5f97c4' },
  { id: 'indigo', name: '인디고', hex: '#6272ad' },
  { id: 'lilac', name: '라일락', hex: '#9481b0' },
  { id: 'plum', name: '자두', hex: '#8f5f92' },
  { id: 'rose', name: '로즈', hex: '#d5847f' },
  { id: 'cherry', name: '체리', hex: '#cf5f74' },
  { id: 'flamingo', name: '플라밍고', hex: '#df8aa6' },
  { id: 'cacao', name: '카카오', hex: '#a97e5c' },
]

export const THEMES: Preset[] = ACCENTS.map((a) => ({ id: a.id, name: a.name, ...deriveVars(a.hex) }))

export const CUSTOM_ID = 'custom'

// themeId(프리셋) 또는 커스텀 색을 앱 전역에 적용
export function applyTheme(themeId: string, customColor?: string) {
  let vars: ThemeVars
  if (themeId === CUSTOM_ID && customColor) {
    vars = deriveVars(customColor)
  } else {
    vars = THEMES.find((t) => t.id === themeId) ?? THEMES[0]
  }
  const root = document.documentElement
  root.style.setProperty('--accent', vars.accent)
  root.style.setProperty('--accent-soft', vars.soft)
  root.style.setProperty('--accent-ink', vars.ink)
  root.style.setProperty('--bg', vars.bg)
  root.style.setProperty('--surface-2', vars.surface2)
}
