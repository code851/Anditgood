// 그림책 수채 스타일의 어린이 (제인 매시풍) — 부드러운 윤곽 + 파스텔 채색.
// 기본은 연한 스케치(틀)만, 챌린지를 이어갈수록 색이 아래에서부터 채워진다.
// 스웨터 색은 앱 테마 색과 연동, 나머지는 그림책 팔레트(금발/살구볼/세이지 반바지/머스터드 부츠).

const OUTLINE = '#7a6350'
const HAIR = '#d8a94e'
const SKIN = '#f6dcc4'
const CHEEK = '#e79a80'
const EYE = '#4a3b30'
const SHORTS = '#8fa771'
const BOOTS = '#e0a63f'

// 손으로 그린 듯한 미세한 흔들림
function Rough({ id, scale }: { id: string; scale: number }) {
  return (
    <filter id={id} x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="1" seed="7" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  )
}

function ChildFill() {
  return (
    <svg viewBox="0 0 120 172" width="100%" height="100%" aria-hidden="true">
      <defs>
        <Rough id="rf" scale={2.2} />
      </defs>
      <g filter="url(#rf)">
        {/* 반바지 (세이지) */}
        <path d="M43 118 L57 118 L56 146 L45 146 Z" fill={SHORTS} />
        <path d="M63 118 L77 118 L75 146 L64 146 Z" fill={SHORTS} />
        {/* 부츠 (머스터드) */}
        <path d="M44 144 L57 144 L57 157 Q57 163 50 163 L41 163 Q38 163 39 159 L42 148 Q42 144 44 144 Z" fill={BOOTS} />
        <path d="M63 144 L76 144 Q78 144 78 148 L81 159 Q82 163 79 163 L70 163 Q63 163 63 157 Z" fill={BOOTS} />
        {/* 손 */}
        <circle cx="36" cy="120" r="5.5" fill={SKIN} />
        <circle cx="84" cy="120" r="5.5" fill={SKIN} />
        {/* 스웨터 (앱 테마 색) */}
        <path d="M35 93 C35 82 46 79 60 79 C74 79 85 82 85 93 L85 119 C85 123 79 124 60 124 C41 124 35 123 35 119 Z" fill="var(--accent)" />
        {/* 줄무늬 */}
        <path d="M37 99 q23 5 46 0" fill="none" stroke="var(--accent-soft)" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        <path d="M37 110 q23 6 46 0" fill="none" stroke="var(--accent-soft)" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        {/* 목 */}
        <path d="M54 70 L66 70 L65 82 L55 82 Z" fill={SKIN} />
        {/* 귀 */}
        <circle cx="30" cy="49" r="5" fill={SKIN} />
        <circle cx="90" cy="49" r="5" fill={SKIN} />
        {/* 얼굴 */}
        <circle cx="60" cy="44" r="29" fill={SKIN} />
        {/* 볼 */}
        <circle cx="45" cy="51" r="7" fill={CHEEK} opacity="0.55" />
        <circle cx="75" cy="51" r="7" fill={CHEEK} opacity="0.55" />
        {/* 머리 (금발, 헝클어진) */}
        <path d="M31 46 C27 22 41 12 60 12 C79 12 93 22 89 46 C86 34 80 30 73 34 C76 26 66 24 60 31 C54 24 44 26 47 34 C40 30 34 34 31 46 Z" fill={HAIR} />
      </g>
    </svg>
  )
}

function ChildLine() {
  return (
    <svg viewBox="0 0 120 172" width="100%" height="100%" aria-hidden="true">
      <defs>
        <Rough id="rl" scale={1.6} />
      </defs>
      <g filter="url(#rl)" fill="none" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* 반바지 */}
        <path d="M43 118 L57 118 L56 146 L45 146" />
        <path d="M63 118 L77 118 L75 146 L64 146" />
        {/* 부츠 */}
        <path d="M44 144 L57 144 L57 157 Q57 163 50 163 L41 163 Q38 163 39 159 L42 148 Q42 144 44 144 Z" />
        <path d="M63 144 L76 144 Q78 144 78 148 L81 159 Q82 163 79 163 L70 163 Q63 163 63 157 Z" />
        {/* 팔 + 손 */}
        <path d="M37 95 Q32 108 36 116" />
        <path d="M83 95 Q88 108 84 116" />
        <circle cx="36" cy="120" r="5.5" />
        <circle cx="84" cy="120" r="5.5" />
        {/* 스웨터 */}
        <path d="M35 93 C35 82 46 79 60 79 C74 79 85 82 85 93 L85 119 C85 123 79 124 60 124 C41 124 35 123 35 119 Z" />
        {/* 카라 */}
        <path d="M53 80 q7 5 14 0" />
        {/* 목 */}
        <path d="M55 71 L55 81" />
        <path d="M65 71 L65 81" />
        {/* 얼굴 */}
        <circle cx="60" cy="44" r="29" />
        {/* 귀 */}
        <circle cx="30" cy="49" r="5" />
        <circle cx="90" cy="49" r="5" />
        {/* 머리 외곽 + 앞머리 결 */}
        <path d="M31 46 C27 22 41 12 60 12 C79 12 93 22 89 46" />
        <path d="M31 45 C34 34 40 30 47 34 C44 26 54 24 60 31 C66 24 76 26 73 34 C80 30 86 34 89 45" />
        {/* 눈 */}
        <circle cx="52" cy="45" r="2.6" fill={EYE} stroke="none" />
        <circle cx="68" cy="45" r="2.6" fill={EYE} stroke="none" />
        {/* 코 */}
        <path d="M59 50 q1.6 2.4 3 0" />
        {/* 웃는 입 */}
        <path d="M53 56 q7 6 14 0" />
      </g>
    </svg>
  )
}

export default function GrowBuddy({ ratio, size = 176 }: { ratio: number; size?: number }) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100 // 위에서부터 감출 비율
  return (
    <div className="buddy" style={{ width: size, height: size * (172 / 120) }}>
      <div className="buddy__fill" style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}>
        <ChildFill />
      </div>
      <div className="buddy__line">
        <ChildLine />
      </div>
    </div>
  )
}
