// 두꺼운 마커 라인 낙서 스타일의 소녀 (양갈래 머리·큰 미소·줄무늬 원피스·팔 벌림).
// 기본은 검은 외곽선만, 챌린지를 이어갈수록 색이 아래에서부터 차올라 완전히 색칠된다.
// 원피스 색은 앱 테마 색과 연동.

const INK = '#141414'
const SKIN = '#f6d7bd'
const HAIR = '#6b4a34'
const CHEEK = '#eaa082'

// 채색 레이어 (외곽선 아래에서 아래→위로 채워짐)
function DollFill() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      {/* 다리 */}
      <path d="M55 132 L51 152 M72 132 L76 152" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* 팔 */}
      <path d="M50 104 Q34 97 22 85" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M78 104 Q94 97 106 85" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* 원피스 (앱 테마 색) */}
      <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" fill="var(--accent)" />
      {/* 얼굴 */}
      <ellipse cx="64" cy="54" rx="35" ry="37" fill={SKIN} />
      {/* 볼 */}
      <circle cx="45" cy="62" r="6.5" fill={CHEEK} opacity="0.6" />
      <circle cx="83" cy="62" r="6.5" fill={CHEEK} opacity="0.6" />
      {/* 양갈래 머리 묶음 */}
      <path d="M48 30 C40 14 27 8 16 11 C21 22 32 27 46 31 Z" fill={HAIR} />
    </svg>
  )
}

// 검은 외곽선 + 이목구비 (항상 보임)
function DollLine() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* 다리 */}
        <path d="M55 132 L51 152" />
        <path d="M72 132 L76 152" />
        <path d="M51 152 q-6 1 -9 -2" />
        <path d="M76 152 q6 1 9 -2" />
        {/* 원피스 */}
        <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" />
        {/* 줄무늬 */}
        <path d="M41 112 L87 112" strokeWidth="3" />
        <path d="M38 121 L90 121" strokeWidth="3" />
        <path d="M36 130 L92 130" strokeWidth="3" />
        {/* 팔 (위로 번쩍) + 손가락 */}
        <path d="M50 104 Q34 97 22 85" />
        <path d="M22 85 l-5 -3 M22 85 l-2 -6 M22 85 l4 -5" strokeWidth="3" />
        <path d="M78 104 Q94 97 106 85" />
        <path d="M106 85 l5 -3 M106 85 l2 -6 M106 85 l-4 -5" strokeWidth="3" />
        {/* 얼굴 */}
        <ellipse cx="64" cy="54" rx="35" ry="37" />
        {/* 양갈래 머리 묶음 (결) */}
        <path d="M47 30 C37 15 26 10 16 11" />
        <path d="M48 27 C40 13 31 7 22 7" />
        <path d="M50 26 C44 12 37 6 31 8" />
        <path d="M43 24 L52 30" strokeWidth="3" />
        {/* 눈 */}
        <ellipse cx="53" cy="51" rx="3.1" ry="4.6" fill={INK} stroke="none" />
        <ellipse cx="75" cy="51" rx="3.1" ry="4.6" fill={INK} stroke="none" />
        {/* 큰 미소 */}
        <path d="M45 61 Q64 89 83 61" />
      </g>
    </svg>
  )
}

export default function GrowBuddy({ ratio, size = 178 }: { ratio: number; size?: number }) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100 // 위에서부터 감출 비율
  return (
    <div className="buddy" style={{ width: size, height: size * (156 / 130) }}>
      {/* 아래에서부터 차오르는 채색 */}
      <div className="buddy__fill" style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}>
        <DollFill />
      </div>
      {/* 검은 외곽선 (항상) */}
      <div className="buddy__line">
        <DollLine />
      </div>
    </div>
  )
}
