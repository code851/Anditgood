// 참고 이미지 같은 선화(라인아트) 어린이 — 옆으로 하나 묶은 머리, 활짝 웃는 얼굴, V넥 원피스.
// 기본은 색 없는 '틀(선)'만, 챌린지를 이어갈수록 앱 테마 색이 아래에서부터 차오른다.

const INK = '#2b2622'
const SKIN = '#f4d7bd'
const HAIR = '#4a3a30'

function ChildFill() {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%" aria-hidden="true">
      {/* 귀 */}
      <circle cx="30" cy="58" r="7" fill={SKIN} />
      <circle cx="90" cy="58" r="7" fill={SKIN} />
      {/* 얼굴 */}
      <circle cx="60" cy="54" r="30" fill={SKIN} />
      {/* 옆으로 묶은 머리(포니테일) */}
      <path d="M35 40 C18 26 7 33 14 46 C11 37 25 35 34 47 Z" fill={HAIR} />
      {/* 머리 */}
      <path d="M31 62 C24 42 30 23 60 22 C90 23 96 42 89 62 C82 48 72 42 60 46 C48 42 38 48 31 62 Z" fill={HAIR} />
      {/* 볼 */}
      <circle cx="44" cy="60" r="5" fill="var(--accent)" opacity="0.28" />
      <circle cx="76" cy="60" r="5" fill="var(--accent)" opacity="0.28" />
      {/* 원피스 (앱 테마 색) */}
      <path d="M49 92 L71 92 L86 133 L34 133 Z" fill="var(--accent)" />
    </svg>
  )
}

function ChildLine() {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* 귀 */}
        <circle cx="30" cy="58" r="7" />
        <circle cx="90" cy="58" r="7" />
        {/* 얼굴 */}
        <circle cx="60" cy="54" r="30" />
        {/* 머리 외곽 + 가운데 가르마 */}
        <path d="M31 62 C24 42 30 23 60 22 C90 23 96 42 89 62" />
        <path d="M31 62 C38 48 48 42 60 46 C72 42 82 48 89 62" />
        <path d="M60 23 L60 45" />
        {/* 옆으로 묶은 머리 */}
        <path d="M35 40 C18 26 7 33 14 46 C11 37 25 35 34 47" />
        {/* 눈 */}
        <ellipse cx="49" cy="54" rx="3" ry="4.2" fill={INK} stroke="none" />
        <ellipse cx="71" cy="54" rx="3" ry="4.2" fill={INK} stroke="none" />
        {/* 활짝 웃는 입 */}
        <path d="M46 64 Q60 82 74 64" />
        {/* 목 + V넥 */}
        <path d="M56 84 L56 90" />
        <path d="M64 84 L64 90" />
        <path d="M54 91 L60 100 L66 91" />
        {/* 원피스 */}
        <path d="M49 92 L71 92 L86 133 L34 133 Z" />
        {/* 팔 */}
        <path d="M51 98 L26 106" />
        <path d="M69 98 L94 106" />
        {/* 손가락 */}
        <path d="M26 106 l-4 -2 M26 106 l-3 2 M26 106 l0 4" />
        <path d="M94 106 l4 -2 M94 106 l3 2 M94 106 l0 4" />
        {/* 다리 */}
        <path d="M53 133 L53 150" />
        <path d="M67 133 L67 150" />
        {/* 발 */}
        <path d="M53 150 q-8 1 -10 -2" />
        <path d="M67 150 q8 1 10 -2" />
      </g>
    </svg>
  )
}

export default function GrowBuddy({ ratio, size = 168 }: { ratio: number; size?: number }) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100 // 위에서부터 감출 비율
  return (
    <div className="buddy" style={{ width: size, height: size * (160 / 120) }}>
      <div className="buddy__fill" style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}>
        <ChildFill />
      </div>
      <div className="buddy__line">
        <ChildLine />
      </div>
    </div>
  )
}
