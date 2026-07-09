import type { ReactNode } from 'react'

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function I({ children }: { children: ReactNode }) {
  return <svg {...base}>{children}</svg>
}

export const IconHome = () => (
  <I>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-5h4v5" />
  </I>
)

export const IconFlag = () => (
  <I>
    <path d="M5 21V4" />
    <path d="M5 5h11l-1.5 3L16 11H5" />
  </I>
)

export const IconGrid = () => (
  <I>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </I>
)

export const IconPeople = () => (
  <I>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.5a3 3 0 0 1 0 5.6" />
    <path d="M17 14.2A5.5 5.5 0 0 1 20.5 19" />
  </I>
)

export const IconUser = () => (
  <I>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </I>
)

export const IconHeart = ({ fill = false }: { fill?: boolean }) => (
  <svg {...base} fill={fill ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />
  </svg>
)

export const IconBookmark = ({ fill = false }: { fill?: boolean }) => (
  <svg {...base} fill={fill ? 'currentColor' : 'none'}>
    <path d="M6 4h12v16l-6-4-6 4V4Z" />
  </svg>
)

export const IconChat = () => (
  <I>
    <path d="M4 5h16v11H9l-4 3v-3H4V5Z" />
  </I>
)

export const IconPlus = () => (
  <I>
    <path d="M12 5v14M5 12h14" />
  </I>
)

export const IconCheck = () => (
  <I>
    <path d="M5 12.5 10 17l9-10" />
  </I>
)

export const IconCoin = () => (
  <I>
    <ellipse cx="12" cy="7" rx="7" ry="3" />
    <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
    <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </I>
)

export const IconSpark = () => (
  <I>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </I>
)
