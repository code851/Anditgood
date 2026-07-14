// 마커 라인 낙서 스타일의 소녀 (양갈래 머리·큰 미소·줄무늬 원피스·팔 벌림).
// 기본은 외곽선만, 챌린지를 이어갈수록 색이 아래에서부터 차올라 완전히 색칠된다.
// equippedItem 으로 캐릭터에 아이템(베레모·붓·캡·안경·헤드셋·왕관)을 장착한다.

const INK = '#2a2622'
const SKIN = '#f6d7bd'
const HAIR = '#6b4a34'
const CHEEK = '#eaa082'

function DollFill() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" fill="var(--accent)" />
      <ellipse cx="64" cy="54" rx="35" ry="37" fill={SKIN} />
      <circle cx="45" cy="63" r="6.5" fill={CHEEK} opacity="0.6" />
      <circle cx="83" cy="63" r="6.5" fill={CHEEK} opacity="0.6" />
      <path d="M30 52 C28 29 42 18 64 18 C86 18 100 29 98 52 C90 40 80 37 71 41 C75 31 64 30 63 39 C61 30 51 32 55 41 C45 37 37 40 30 52 Z" fill={HAIR} />
      <path d="M45 34 C34 16 19 11 9 15 C14 27 28 33 45 38 Z" fill={HAIR} />
    </svg>
  )
}

function DollLine() {
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M55 132 L51 152" />
        <path d="M72 132 L76 152" />
        <path d="M51 152 q-6 1 -9 -2" />
        <path d="M76 152 q6 1 9 -2" />
        <path d="M50 101 Q64 95 78 101 L91 133 L37 133 Z" />
        <path d="M41 112 L87 112" strokeWidth="2" />
        <path d="M38 121 L90 121" strokeWidth="2" />
        <path d="M36 130 L92 130" strokeWidth="2" />
        <path d="M50 104 Q34 97 22 85" />
        <path d="M22 85 l-5 -3 M22 85 l-2 -6 M22 85 l4 -5" strokeWidth="2" />
        <path d="M78 104 Q94 97 106 85" />
        <path d="M106 85 l5 -3 M106 85 l2 -6 M106 85 l-4 -5" strokeWidth="2" />
        <ellipse cx="64" cy="54" rx="35" ry="37" />
        <path d="M30 52 C37 41 45 38 55 41 C51 32 61 30 63 39 C64 30 74 32 71 41 C80 38 90 41 98 52" />
        <path d="M45 34 C35 17 21 12 10 15" />
        <path d="M46 31 C38 15 26 9 17 9" />
        <path d="M47 37 C40 24 30 19 21 20" />
        <path d="M42 26 L50 33" strokeWidth="2" />
        <ellipse cx="53" cy="52" rx="2.9" ry="4.3" fill={INK} stroke="none" />
        <ellipse cx="75" cy="52" rx="2.9" ry="4.3" fill={INK} stroke="none" />
        <path d="M46 61 Q64 88 82 61" />
      </g>
    </svg>
  )
}

function ItemSvg({ item }: { item: string }) {
  const s = { stroke: INK, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 130 156" width="100%" height="100%" aria-hidden="true">
      {item === 'beret' && (
        <g transform="rotate(-14 58 17)">
          <ellipse cx="58" cy="18" rx="25" ry="9.5" fill="#c0554a" {...s} />
          <path d="M40 15 Q58 9 76 15" fill="none" stroke="#e88a7d" strokeWidth="2" />
          <circle cx="58" cy="7" r="3" fill="#c0554a" {...s} />
        </g>
      )}
      {item === 'crown' && (
        <g>
          <path d="M40 27 L45 12 L55 21 L64 8 L73 21 L83 12 L88 27 Z" fill="#e6b84b" {...s} />
          <path d="M40 27 L88 27" {...s} />
          <circle cx="64" cy="17" r="2.3" fill="#c0554a" stroke={INK} strokeWidth="1.2" />
        </g>
      )}
      {item === 'cap' && (
        <g>
          <path d="M35 45 Q40 24 64 24 Q88 24 93 45 Z" fill="#3f6f8a" {...s} />
          <path d="M90 45 Q107 45 108 52 Q100 48 88 48 Z" fill="#345a72" {...s} />
          <circle cx="64" cy="26" r="2.4" fill="#345a72" />
        </g>
      )}
      {item === 'glasses' && (
        <g fill="none" {...s} strokeWidth="2.6">
          <circle cx="53" cy="52" r="8.5" fill="#ffffff" fillOpacity="0.25" />
          <circle cx="75" cy="52" r="8.5" fill="#ffffff" fillOpacity="0.25" />
          <path d="M61.5 51 Q64 49 66.5 51" />
          <path d="M44.5 51 L34 49 M83.5 51 L94 49" />
        </g>
      )}
      {item === 'headset' && (
        <g>
          <path d="M30 55 Q64 12 98 55" fill="none" stroke="#3a3a3a" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="24" y="49" width="11" height="16" rx="5" fill="#3a3a3a" stroke={INK} strokeWidth="1.5" />
          <rect x="93" y="49" width="11" height="16" rx="5" fill="#3a3a3a" stroke={INK} strokeWidth="1.5" />
        </g>
      )}
      {item === 'brush' && (
        <g>
          <path d="M104 88 L120 58" stroke="#b98a53" strokeWidth="5" strokeLinecap="round" />
          <path d="M104 88 L120 58" fill="none" {...s} strokeWidth="1.4" />
          <rect x="113" y="55" width="8" height="6" rx="1.5" transform="rotate(28 117 58)" fill="#cfcfcf" stroke={INK} strokeWidth="1.4" />
          <path d="M120 58 L128 50 L124 60 Z" fill="#c0554a" {...s} strokeWidth="1.6" />
        </g>
      )}
    </svg>
  )
}

export default function GrowBuddy({
  ratio,
  size = 178,
  item = null,
}: {
  ratio: number
  size?: number
  item?: string | null
}) {
  const r = Math.max(0, Math.min(1, ratio))
  const hidePct = (1 - r) * 100
  return (
    <div className="buddy" style={{ width: size, height: size * (156 / 130) }}>
      <div className="buddy__fill" style={{ clipPath: `inset(${hidePct}% 0 0 0)` }}>
        <DollFill />
      </div>
      <div className="buddy__line">
        <DollLine />
      </div>
      {item && (
        <div className="buddy__line">
          <ItemSvg item={item} />
        </div>
      )}
    </div>
  )
}
