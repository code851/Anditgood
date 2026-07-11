// 참고 이미지 같은 선화(라인아트) 어린이.
// 기본은 색 없는 '틀(선)'만, 챌린지를 이어갈수록 앱 테마 색이 아래에서부터 차오른다.

const INK = '#2b2622'
const SKIN = '#f4d7bd'
const HAIR = '#4a3a30'

function ChildFill() {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%" aria-hidden="true">
      {/* 머리카락 */}
      <ellipse cx="31" cy="43" rx="11" ry="15" fill={HAIR} />
      <ellipse cx="89" cy="43" rx="11" ry="15" fill={HAIR} />
      <path d="M33 47 Q35 19 60 18 Q85 19 87 47 Q72 34 60 35 Q48 34 33 47 Z" fill={HAIR} />
      {/* 얼굴 */}
      <circle cx="60" cy="47" r="26" fill={SKIN} />
      {/* 볼 */}
      <circle cx="46" cy="55" r="5" fill="var(--accent)" opacity="0.32" />
      <circle cx="74" cy="55" r="5" fill="var(--accent)" opacity="0.32" />
      {/* 원피스 (앱 테마 색) */}
      <path d="M47 78 L73 78 L88 124 L32 124 Z" fill="var(--accent)" />
    </svg>
  )
}

function ChildLine() {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* 양갈래 머리 */}
        <ellipse cx="31" cy="43" rx="11" ry="15" />
        <ellipse cx="89" cy="43" rx="11" ry="15" />
        <path d="M33 47 Q35 19 60 18 Q85 19 87 47" />
        <path d="M33 47 Q48 34 60 35 Q72 34 87 47" />
        {/* 얼굴 */}
        <circle cx="60" cy="47" r="26" />
        {/* 눈 */}
        <circle cx="51" cy="47" r="2.6" fill={INK} stroke="none" />
        <circle cx="69" cy="47" r="2.6" fill={INK} stroke="none" />
        {/* 웃는 입 */}
        <path d="M50 55 Q60 65 70 55" />
        {/* 목 */}
        <path d="M55 71 L55 78" />
        <path d="M65 71 L65 78" />
        {/* 원피스 */}
        <path d="M47 78 L73 78 L88 124 L32 124 Z" />
        {/* 팔 */}
        <path d="M48 82 L27 97" />
        <path d="M72 82 L93 97" />
        {/* 손가락 */}
        <path d="M27 97 l-4 -1 M27 97 l-3 3 M27 97 l1 4" />
        <path d="M93 97 l4 -1 M93 97 l3 3 M93 97 l-1 4" />
        {/* 다리 */}
        <path d="M52 124 L52 147" />
        <path d="M68 124 L68 147" />
        {/* 발 */}
        <path d="M52 147 q-7 1 -9 -2" />
        <path d="M68 147 q7 1 9 -2" />
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
