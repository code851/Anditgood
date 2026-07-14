import { useState } from 'react'
import { useStore, GROWTH_CAP, totalCheckIns, type Certificate } from '../store'
import { CHALLENGES, BADGES } from '../data/content'
import { THEMES, CUSTOM_ID } from '../data/themes'
import { ITEMS } from '../data/items'
import { CURRENCY_PRESETS, currencyEmoji } from '../data/currency'
import GrowBuddy from '../components/GrowBuddy'
import { Sheet, fmt, useToast } from '../components/ui'
import { IconBox, IconPalette } from '../components/icons'

export default function MyPage() {
  const { state, set, setTheme, setCustomColor, setEquippedItem, setCurrencyLabel, reset } = useStore()
  const toast = useToast()
  const [colorOpen, setColorOpen] = useState(false)
  const [itemOpen, setItemOpen] = useState(false)
  const [curOpen, setCurOpen] = useState(false)
  const [badgeId, setBadgeId] = useState<string | null>(null)
  const [customCur, setCustomCur] = useState('')

  const days = totalCheckIns(state.joined)
  const ratio = Math.min(1, days / GROWTH_CAP)
  const donatedTotal = state.certificates.reduce((a, c) => a + c.amount, 0)
  const currency = state.currencyLabel
  const curEmoji = currencyEmoji(currency)

  const allBadges = Object.values(BADGES)
  const earnedCount = allBadges.filter((b) => state.badges.includes(b.id)).length

  const growthCopy = ratio >= 1 ? '완성! 레벨 MAX ✦' : days === 0 ? '오늘부터 채워가요' : '함께 자라는 중'

  return (
    <div className="scroll">
      <header className="appbar">
        <div className="appbar__title">마이</div>
        <div className="row" style={{ gap: 8 }}>
          <IconRoundButton label="컬러 설정" onClick={() => setColorOpen(true)}>
            <IconPalette />
          </IconRoundButton>
          <IconRoundButton label="아이템 박스" onClick={() => setItemOpen(true)}>
            <IconBox />
          </IconRoundButton>
        </div>
      </header>

      <div className="page">
        {/* 성장 캐릭터 (아이템 장착) */}
        <div
          className="card fadeUp"
          style={{
            padding: '26px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(180deg, var(--accent-soft) -10%, #fff 55%)',
          }}
        >
          <GrowBuddy ratio={ratio} item={state.equippedItem} />
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: 'var(--accent-ink)' }}>
            챌린지 {days}일차
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3, letterSpacing: -0.4 }}>{growthCopy}</div>
          <div style={{ width: 'min(240px,80%)', marginTop: 14 }}>
            <div style={{ height: 7, borderRadius: 6, background: 'var(--surface-sunken)', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${ratio * 100}%`,
                  height: '100%',
                  borderRadius: 6,
                  background: 'var(--accent)',
                  transition: 'width .6s cubic-bezier(.2,.8,.2,1)',
                }}
              />
            </div>
            <button
              onClick={() => setItemOpen(true)}
              style={{ display: 'block', width: '100%', marginTop: 9, fontSize: 11.5, fontWeight: 700, color: 'var(--accent-ink)' }}
            >
              🧰 아이템 박스에서 꾸미기 →
            </button>
          </div>
        </div>

        {/* 투자·기부 현황 (단위 커스텀) */}
        <div className="card" style={{ marginTop: 12, padding: 18 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <button onClick={() => setCurOpen(true)} className="row" style={{ gap: 4, color: 'var(--ink-3)' }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>투자 가능한 {currency}</span>
                <span style={{ fontSize: 11 }}>✎</span>
              </button>
              <div className="row" style={{ gap: 7, marginTop: 4 }}>
                <span style={{ fontSize: 22 }}>{curEmoji}</span>
                <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.3 }}>{fmt(state.seeds)}</span>
              </div>
            </div>
            <button
              className="btn btn--ghost"
              style={{ padding: '11px 15px', fontSize: 13 }}
              onClick={() => {
                set({ seeds: state.seeds + 10 })
                toast(`${currency} +10 채웠어요 ${curEmoji}`)
              }}
            >
              채우기
            </button>
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
            <MiniStat emoji="🎁" label="지금까지 전한 나눔" value={`${fmt(donatedTotal)} ${currency}`} />
            <MiniStat emoji="📜" label="발급된 기부증서" value={`${state.certificates.length}장`} />
          </div>
        </div>

        {/* 뱃지 컬렉션 */}
        <div className="sec">
          <span className="sec__title">뱃지 컬렉션</span>
          <span className="sec__more">{earnedCount}/{allBadges.length}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {allBadges.map((b) => {
            const owned = state.badges.includes(b.id)
            return (
              <button
                key={b.id}
                onClick={() => setBadgeId(b.id)}
                className="card"
                style={{
                  padding: '16px 8px',
                  textAlign: 'center',
                  opacity: owned ? 1 : 0.5,
                  filter: owned ? 'none' : 'grayscale(1)',
                }}
              >
                <div style={{ fontSize: 30 }}>{owned ? b.emoji : '🔒'}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>{b.name}</div>
              </button>
            )
          })}
        </div>
        <p className="muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          뱃지를 누르면 어느 챌린지에서 얻었고 어디에 기부됐는지 볼 수 있어요.
        </p>

        <button
          className="muted"
          style={{ display: 'block', margin: '24px auto 4px', fontSize: 12.5, fontWeight: 600 }}
          onClick={() => {
            if (confirm('모든 데이터를 초기화하고 온보딩을 다시 할까요?')) reset()
          }}
        >
          데이터 초기화 (온보딩 다시하기)
        </button>
      </div>

      {/* ── 아이템 박스 시트 ── */}
      <Sheet open={itemOpen} onClose={() => setItemOpen(false)} title="🧰 아이템 박스">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
          <GrowBuddy ratio={Math.max(ratio, 0.85)} size={116} item={state.equippedItem} />
        </div>
        <p className="muted" style={{ fontSize: 13, textAlign: 'center', margin: '0 0 16px', lineHeight: 1.5 }}>
          챌린지를 완주할 때마다 아이템이 열려요. 눌러서 캐릭터에 장착해 보세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {/* 장착 해제 */}
          <button
            onClick={() => setEquippedItem(state.equippedItem)}
            className="card"
            style={{ padding: '14px 6px', textAlign: 'center', borderColor: !state.equippedItem ? 'var(--accent)' : 'var(--line)' }}
          >
            <div style={{ fontSize: 26 }}>🚫</div>
            <div style={{ fontSize: 11, fontWeight: 700, marginTop: 5 }}>없음</div>
          </button>
          {ITEMS.map((it) => {
            const unlocked = state.badges.includes(it.unlockBadge)
            const equipped = state.equippedItem === it.id
            return (
              <button
                key={it.id}
                className="card"
                onClick={() => {
                  if (!unlocked) {
                    toast(`🔒 '${it.from}' 완주하면 열려요`)
                    return
                  }
                  setEquippedItem(it.id)
                  toast(equipped ? '장착을 해제했어요' : `${it.name} 장착! ${it.icon}`)
                }}
                style={{
                  padding: '14px 6px',
                  textAlign: 'center',
                  position: 'relative',
                  opacity: unlocked ? 1 : 0.55,
                  borderColor: equipped ? 'var(--accent)' : 'var(--line)',
                  borderWidth: equipped ? 2 : 1,
                }}
              >
                <div style={{ fontSize: 26, filter: unlocked ? 'none' : 'grayscale(1)' }}>
                  {unlocked ? it.icon : '🔒'}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 5, lineHeight: 1.25 }}>{it.name}</div>
                <div className="muted" style={{ fontSize: 9.5, marginTop: 2 }}>
                  {unlocked ? (equipped ? '장착 중' : '장착하기') : `${it.from} 완주`}
                </div>
              </button>
            )
          })}
        </div>
      </Sheet>

      {/* ── 투자 단위 설정 시트 ── */}
      <Sheet open={curOpen} onClose={() => setCurOpen(false)} title="✎ 나의 투자 단위">
        <p className="muted" style={{ fontSize: 13, margin: '0 0 16px', lineHeight: 1.55 }}>
          내가 투자하는 것에 이름을 붙여보세요. 열매, 경험, 가치, 영감… 단어에 따라 그림도 바뀌어요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {CURRENCY_PRESETS.map((p) => {
            const active = currency === p.word
            return (
              <button
                key={p.word}
                onClick={() => {
                  setCurrencyLabel(p.word)
                  toast(`투자 단위를 '${p.word}'(으)로 바꿨어요 ${p.emoji}`)
                }}
                className="card"
                style={{ padding: '13px 4px', textAlign: 'center', borderColor: active ? 'var(--accent)' : 'var(--line)', borderWidth: active ? 2 : 1 }}
              >
                <div style={{ fontSize: 24 }}>{p.emoji}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 5 }}>{p.word}</div>
              </button>
            )
          })}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)', margin: '18px 0 8px' }}>직접 입력</div>
        <div className="row" style={{ gap: 8 }}>
          <input
            className="obInput"
            value={customCur}
            onChange={(e) => setCustomCur(e.target.value)}
            placeholder="예: 용기, 사랑, 발걸음"
            maxLength={6}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn--accent"
            style={{ padding: '0 18px', fontSize: 14 }}
            disabled={!customCur.trim()}
            onClick={() => {
              setCurrencyLabel(customCur.trim())
              toast(`투자 단위를 '${customCur.trim()}'(으)로 바꿨어요 ✦`)
              setCustomCur('')
            }}
          >
            적용
          </button>
        </div>
        <div className="muted" style={{ fontSize: 11.5, marginTop: 10 }}>
          직접 입력한 단어는 ✦ 그림으로 표시돼요.
        </div>
        <style>{`.obInput{width:100%;padding:13px 15px;border-radius:13px;border:1.6px solid var(--line-strong);
          background:var(--surface);font-size:15px;color:var(--ink);outline:none;}
          .obInput:focus{border-color:var(--accent);}`}</style>
      </Sheet>

      {/* ── 뱃지 상세 시트 ── */}
      <Sheet open={!!badgeId} onClose={() => setBadgeId(null)} title="">
        {badgeId && <BadgeDetail badgeId={badgeId} state={state} currency={currency} />}
      </Sheet>

      {/* ── 컬러 설정 시트 ── */}
      <Sheet open={colorOpen} onClose={() => setColorOpen(false)} title="🎨 앱 전체 컬러">
        <p className="muted" style={{ fontSize: 13.5, margin: '0 0 16px', lineHeight: 1.5 }}>
          앱 전체 분위기를 나에게 어울리는 색으로 바꿔보세요. 마음에 드는 색을
          고르거나 직접 만들어 나만의 개성을 담아보세요.
        </p>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, background: 'var(--surface-2)', marginBottom: 18 }}
        >
          <label
            className={state.themeId === CUSTOM_ID ? 'swatch is-active' : 'swatch'}
            style={{
              width: 54,
              height: 54,
              flexShrink: 0,
              cursor: 'pointer',
              position: 'relative',
              background:
                state.themeId === CUSTOM_ID && state.customColor
                  ? state.customColor
                  : 'conic-gradient(from 210deg,#e8734a,#dda63f,#8fa771,#4c9aa0,#6f88ab,#9481b0,#d5847f,#e8734a)',
            }}
          >
            <input
              type="color"
              value={state.customColor ?? '#e8734a'}
              onChange={(e) => setCustomColor(e.target.value)}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.35))' }}>
              {state.themeId === CUSTOM_ID ? '✓' : '＋'}
            </span>
          </label>
          <div style={{ lineHeight: 1.4 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>내 색 직접 만들기</div>
            <div className="muted" style={{ fontSize: 12.5 }}>
              {state.themeId === CUSTOM_ID && state.customColor ? `현재 ${state.customColor.toUpperCase()}` : '색을 눌러 원하는 색을 골라요'}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10 }}>추천 팔레트</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {THEMES.map((t) => {
            const active = state.themeId === t.id
            return (
              <button
                key={t.id}
                title={t.name}
                onClick={() => {
                  setTheme(t.id)
                  toast(`${t.name} 컬러로 바꿨어요`)
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <span className={active ? 'swatch is-active' : 'swatch'} style={{ background: t.accent }}>
                  {active && (
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))' }}>✓</span>
                  )}
                </span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: active ? 'var(--ink)' : 'var(--ink-3)' }}>{t.name}</span>
              </button>
            )
          })}
        </div>
      </Sheet>
    </div>
  )
}

function BadgeDetail({
  badgeId,
  state,
  currency,
}: {
  badgeId: string
  state: ReturnType<typeof useStore>['state']
  currency: string
}) {
  const b = BADGES[badgeId]
  const owned = state.badges.includes(badgeId)
  const ch = CHALLENGES.find((c) => c.badgeOnClear === badgeId)
  const cert = ch ? state.certificates.find((c) => c.challengeId === ch.id) : undefined

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 52 }}>{owned ? b.emoji : '🔒'}</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{b.name}</div>
        <div className="muted" style={{ fontSize: 13.5, marginTop: 3 }}>{b.desc}</div>
        <span
          className="chip"
          style={{
            marginTop: 10,
            padding: '4px 12px',
            fontSize: 11.5,
            background: owned ? 'var(--accent-soft)' : 'var(--surface-2)',
            color: owned ? 'var(--accent-ink)' : 'var(--ink-3)',
            borderColor: 'transparent',
          }}
        >
          {owned ? '획득 완료' : '아직 잠김'}
        </span>
      </div>

      {ch ? (
        <>
          <div style={{ display: 'flex', gap: 10, background: 'var(--surface-2)', borderRadius: 13, padding: '13px 14px' }}>
            <span style={{ fontSize: 24 }}>{ch.emoji}</span>
            <div>
              <div className="muted" style={{ fontSize: 11, fontWeight: 700 }}>획득 챌린지</div>
              <div style={{ fontSize: 14.5, fontWeight: 800 }}>{ch.title}</div>
            </div>
          </div>
          {cert ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>
                전달한 곳 · 발급된 기부증서
              </div>
              <CertificateCard c={cert} name={state.name} unit={currency} />
            </div>
          ) : (
            <p className="muted" style={{ fontSize: 12.5, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              이 챌린지를 완주하면 기부 대상을 직접 골라 나눔을 전하고, 감사 카드(기부증서)가 발급돼요.
            </p>
          )}
        </>
      ) : (
        <p className="muted" style={{ fontSize: 12.5, textAlign: 'center', lineHeight: 1.5 }}>
          꾸준함으로 얻는 뱃지예요. 미션을 이어가면 자연스럽게 따라와요.
        </p>
      )}
    </div>
  )
}

function IconRoundButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {children}
    </button>
  )
}

function MiniStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 12, padding: '11px 12px' }}>
      <div className="muted" style={{ fontSize: 11, fontWeight: 700 }}>
        {emoji} {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3 }}>{value}</div>
    </div>
  )
}

const CARNATION_RED = '#c8322f'
const CARNATION_GREEN = '#4e7a49'

function Carnation({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 64" width={size} height={(size * 64) / 48} aria-hidden="true">
      <path d="M24 30 C24 42 24 50 24 60" stroke={CARNATION_GREEN} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M24 45 C16 43 12 47 11 53 C19 53 24 50 24 45 Z" fill={CARNATION_GREEN} />
      <path d="M24 39 C31 37 36 40 37 45 C29 46 24 44 24 39 Z" fill={CARNATION_GREEN} />
      <path d="M19 27 L29 27 L26 34 L22 34 Z" fill={CARNATION_GREEN} />
      <path d="M9 24 Q10 7 24 6 Q38 7 39 24 Q33 16 29 21 Q31 10 24 15 Q17 10 19 21 Q15 16 9 24 Z" fill={CARNATION_RED} />
      <path d="M16 20 Q18 13 20 20 M24 11 L24 21 M28 20 Q30 13 32 20" stroke="#fff" strokeWidth="1" opacity="0.55" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CertificateCard({ c, name, unit = '열매' }: { c: Certificate; name: string; unit?: string }) {
  return (
    <div
      style={{
        position: 'relative',
        border: '1.5px solid #e6c9c4',
        borderRadius: 18,
        background: 'linear-gradient(160deg,#fffdfb,#fbeeec)',
        padding: '20px 18px 18px',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Carnation />
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2.5, color: CARNATION_RED, fontWeight: 800, marginTop: 4 }}>THANK YOU</div>
        <div style={{ fontSize: 23, fontWeight: 800, margin: '1px 0 0', letterSpacing: -0.5 }}>감사합니다</div>
      </div>

      <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--ink-2)', textAlign: 'center', margin: '12px 4px 16px' }}>
        <b style={{ color: 'var(--ink)' }}>{name || '회원'}</b>님의{' '}
        <b style={{ color: 'var(--ink)' }}>「{c.challengeTitle}」</b> 완주 덕분에,
        <br />
        아래 이웃에게 예술을 누릴 한 조각이 전해졌어요.
      </p>

      <div
        style={{
          border: `1.5px dashed ${CARNATION_RED}55`,
          borderRadius: 13,
          padding: '13px 14px',
          display: 'flex',
          gap: 11,
          alignItems: 'center',
          background: '#fff',
        }}
      >
        <span style={{ fontSize: 26 }}>{c.beneficiaryEmoji}</span>
        <div style={{ lineHeight: 1.35, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: CARNATION_RED }}>받은 곳</div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>{c.beneficiaryName}</div>
          <div className="muted" style={{ fontSize: 12 }}>{c.beneficiaryGroup}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-3)' }}>전한 나눔</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: CARNATION_RED }}>{unit} {c.amount}</div>
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: 'var(--ink-3)' }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>No. {c.serial}</span>
        <span>{new Date(c.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div style={{ marginTop: 8, textAlign: 'right', fontSize: 12.5, fontWeight: 800, letterSpacing: 0.5, color: CARNATION_RED }}>
        안디잇굿 나눔 🌹
      </div>
    </div>
  )
}
