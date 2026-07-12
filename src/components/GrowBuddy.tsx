// 마커 라인 낙서 스타일의 소녀 (양갈래 머리·큰 미소·줄무늬 원피스·팔 벌림).
// 기본은 외곽선만, 챌린지를 이어갈수록 색이 아래에서부터 차올라 완전히 색칠된다.
// 원피스 색은 앱 테마 색과 연동.

const INK = '#2a2622'
const SKIN = '#f6d7bd'
const HAIR = '#6b4a34'
const CHEEK = '#eaa082'

// 채색 레이어 (외곽선 아래에서 아래→위로 채워짐)
function DollFill() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      {/* 원피스 (앱 테마 색) */}
      <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" fill="var(--accent)" />
      {/* 얼굴 */}
      <ellipse cx="64" cy="54" rx="35" ry="37" fill={SKIN} />
      {/* 볼 */}
      <circle cx="45" cy="63" r="6.5" fill={CHEEK} opacity="0.6" />
      <circle cx="83" cy="63" r="6.5" fill={CHEEK} opacity="0.6" />
      {/* 머리카락 (앞머리 + 양갈래) */}
      <path d="M30 52 C28 29 42 18 64 18 C86 18 100 29 98 52 C90 40 80 37 71 41 C75 31 64 30 63 39 C61 30 51 32 55 41 C45 37 37 40 30 52 Z" fill={HAIR} />
      <path d="M45 34 C34 16 19 11 9 15 C14 27 28 33 45 38 Z" fill={HAIR} />
    </svg>
  )
}

// 외곽선 + 이목구비 (항상 보임)
function DollLine() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {/* 다리 */}
        <path d="M55 132 L51 152" />
        <path d="M72 132 L76 152" />
        <path d="M51 152 q-6 1 -9 -2" />
        <path d="M76 152 q6 1 9 -2" />
        {/* 원피스 */}
        <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" />
        {/* 줄무늬 */}
        <path d="M41 112 L87 112" strokeWidth="2" />
        <path d="M38 121 L90 121" strokeWidth="2" />
        <path d="M36 130 L92 130" strokeWidth="2" />
        {/* 팔 (위로 번쩍) + 손가락 */}
        <path d="M50 104 Q34 97 22 85" />
        <path d="M22 85 l-5 -3 M22 85 l-2 -6 M22 85 l4 -5" strokeWidth="2" />
        <path d="M78 104 Q94 97 106 85" />
        <path d="M106 85 l5 -3 M106 85 l2 -6 M106 85 l-4 -5" strokeWidth="2" />
        {/* 얼굴 */}
        <ellipse cx="64" cy="54" rx="35" ry="37" />
        {/* 앞머리 라인 */}
        <path d="M30 52 C37 41 45 38 55 41 C51 32 61 30 63 39 C64 30 74 32 71 41 C80 38 90 41 98 52" />
        {/* 양갈래 결 + 끈 */}
        <path d="M45 34 C35 17 21 12 10 15" />
        <path d="M46 31 C38 15 26 9 17 9" />
        <path d="M47 37 C40 24 30 19 21 20" />
        <path d="M42 26 L50 33" strokeWidth="2" />
        {/* 눈 */}
        <ellipse cx="53" cy="52" rx="2.9" ry="4.3" fill={INK} stroke="none" />
        <ellipse cx="75" cy="52" rx="2.9" ry="4.3" fill={INK} stroke="none" />
        {/* 큰 미소 */}
        <path d="M46 61 Q64 88 82 61" />
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
      {/* 외곽선 (항상) */}
      <div className="buddy__line">
        <DollLine />
      </div>
    </div>
  )
}
