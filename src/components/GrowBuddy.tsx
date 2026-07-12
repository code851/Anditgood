// 굵은 흑백 잉크(레트로 RPG 카드) 스타일의 아이 캐릭터.
// 기본은 연한 스케치, 챌린지를 이어갈수록 아래에서부터 진한 잉크가 차오른다(레벨업).
// 귀 동그라미 없음.

const INK = '#17140f'

function Rough({ id }: { id: string }) {
  return (
    <filter id={id} x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency="0.014 0.02" numOctaves="1" seed="9" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  )
}

function ChildInk() {
  return (
    <svg viewBox="0 0 120 172" width="100%" height="100%" aria-hidden="true">
      <defs>
        <Rough id="inkRough" />
      </defs>
      <g filter="url(#inkRough)">
        {/* 신발 (검정) */}
        <path d="M45 152 L58 152 L58 161 Q58 166 52 166 L44 166 Q41 166 41 162 L42 155 Q42 152 45 152 Z" fill={INK} />
        <path d="M62 152 L75 152 Q77 152 77 155 L78 162 Q78 166 75 166 L67 166 Q62 166 62 161 Z" fill={INK} />
        {/* 다리 (윤곽) */}
        <path d="M50 138 L49 153 M70 138 L71 153" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 반바지 (윤곽 + 해칭) */}
        <path d="M43 120 L77 120 L74 140 L60 140 L60 122 L60 140 L46 140 Z" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M47 126 l6 8 M52 124 l6 10 M64 125 l6 9 M69 127 l5 7" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        {/* 팔 (윤곽) + 손 */}
        <path d="M40 92 Q31 104 32 116" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M80 92 Q89 104 88 116" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="119" r="4.5" fill="none" stroke={INK} strokeWidth="3" />
        <circle cx="88" cy="119" r="4.5" fill="none" stroke={INK} strokeWidth="3" />
        {/* 티셔츠 (검정 채움) */}
        <path d="M38 92 C38 80 48 76 60 76 C72 76 82 80 82 92 L82 117 C82 121 76 122 60 122 C44 122 38 121 38 117 Z" fill={INK} />
        {/* 목 */}
        <path d="M55 68 L55 76 M65 68 L65 76" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 얼굴 (흰 바탕 + 굵은 윤곽) */}
        <circle cx="60" cy="44" r="24" fill="#fff" stroke={INK} strokeWidth="3.2" />
        {/* 머리카락 (검정, 헝클어진) */}
        <path d="M37 42 C34 20 46 12 60 12 C74 12 86 20 83 42 C79 31 72 29 66 32 C70 23 60 21 60 31 C60 21 50 23 54 32 C48 29 41 31 37 42 Z" fill={INK} />
        {/* 눈 */}
        <circle cx="52" cy="44" r="2.9" fill={INK} />
        <circle cx="68" cy="44" r="2.9" fill={INK} />
        {/* 웃는 입 */}
        <path d="M52 52 Q60 60 68 52" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 붓 (예술의 상징 · 카드의 무기처럼 대각선으로) */}
        <path d="M30 150 L86 96" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M84 92 L94 100 L88 106 L80 98 Z" fill={INK} />
        <circle cx="30" cy="150" r="3.2" fill={INK} />
      </g>
    </svg>
  )
}

export default function GrowBuddy({ ratio, size = 176 }: { ratio: number; size?: number }) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100 // 위에서부터 감출 비율
  return (
    <div className="buddy" style={{ width: size, height: size * (172 / 120) }}>
      {/* 아직 안 채워진 연한 스케치 */}
      <div className="buddy__line" style={{ opacity: 0.16 }}>
        <ChildInk />
      </div>
      {/* 아래에서부터 차오르는 진한 잉크 */}
      <div className="buddy__fill" style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}>
        <ChildInk />
      </div>
    </div>
  )
}
