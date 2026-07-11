// 챌린지를 이어갈수록 색이 아래에서부터 차오르는 아기 새싹 캐릭터

function BuddySvg() {
  return (
    <svg viewBox="0 0 120 128" width="100%" height="100%" aria-hidden="true">
      {/* 새싹 (머리 위) */}
      <path d="M60 34 C60 24 60 18 60 14" stroke="#6f9e56" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path
        d="M60 22 C52 20 46 13 47 6 C55 6 61 12 60 22 Z"
        fill="#9ccd7e"
        stroke="#5f8a49"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M60 26 C68 25 75 19 75 12 C67 11 60 16 60 26 Z"
        fill="#86b56a"
        stroke="#5f8a49"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* 몸통 */}
      <ellipse cx="60" cy="80" rx="38" ry="40" fill="#f7d7bb" stroke="#7a5a44" strokeWidth="3" />
      {/* 배 하이라이트 */}
      <ellipse cx="60" cy="86" rx="26" ry="27" fill="#fce7d6" />

      {/* 볼 */}
      <ellipse cx="41" cy="86" rx="7" ry="5.2" fill="#ef9a86" opacity="0.85" />
      <ellipse cx="79" cy="86" rx="7" ry="5.2" fill="#ef9a86" opacity="0.85" />

      {/* 눈 (편안하게 감은 웃는 눈) */}
      <path d="M46 74 q5 6 10 0" stroke="#5b4536" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M64 74 q5 6 10 0" stroke="#5b4536" strokeWidth="3.4" strokeLinecap="round" fill="none" />

      {/* 입 */}
      <path d="M55 92 q5 5 10 0" stroke="#5b4536" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* 작은 팔 */}
      <path d="M24 88 q-6 2 -8 8" stroke="#7a5a44" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M96 88 q6 2 8 8" stroke="#7a5a44" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function GrowBuddy({ ratio, size = 168 }: { ratio: number; size?: number }) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100 // 위에서부터 감출 비율
  return (
    <div className="buddy" style={{ width: size, height: size * (128 / 120) }}>
      <div className="buddy__layer buddy__gray">
        <BuddySvg />
      </div>
      <div
        className="buddy__layer buddy__color"
        style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}
      >
        <BuddySvg />
      </div>
    </div>
  )
}
