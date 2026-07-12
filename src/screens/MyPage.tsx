import { useState } from 'react'
import { useStore, GROWTH_CAP, totalCheckIns, type Certificate } from '../store'
import { ART_TYPES } from '../data/artTypes'
import { CHALLENGES, BADGES, type Badge } from '../data/content'
import { THEMES, CUSTOM_ID } from '../data/themes'
import GrowBuddy from '../components/GrowBuddy'
import { Sheet, fmt, useToast } from '../components/ui'
import { IconSeed, IconSeal, IconPalette } from '../components/icons'

export default function MyPage() {
  const { state, set, setTheme, setCustomColor, reset } = useStore()
  const toast = useToast()
  const [editOpen, setEditOpen] = useState(false)
  const [certOpen, setCertOpen] = useState(false)
  const [colorOpen, setColorOpen] = useState(false)
  const [name, setName] = useState(state.name)
  const [bio, setBio] = useState(state.bio)
  const [goal, setGoal] = useState(state.goal)
  const [tab, setTab] = useState<'archive' | 'badges'>('archive')

  const type = state.type ? ART_TYPES[state.type] : null
  const days = totalCheckIns(state.joined)
  const ratio = Math.min(1, days / GROWTH_CAP)
  const donatedTotal = state.certificates.reduce((a, c) => a + c.amount, 0)

  const earnedBadges = state.badges.map((id) => BADGES[id]).filter(Boolean) as Badge[]
  const allBadges = Object.values(BADGES)

  const journey = state.joined
    .map((j) => ({ j, ch: CHALLENGES.find((c) => c.id === j.challengeId)! }))
    .filter((x) => x.ch)

  // 뱃지 탭에 보여줄 발급 예시 증서
  const c0 = CHALLENGES[0]
  const sampleCert: Certificate = {
    id: 'sample',
    serial: 'AG-2026-0000',
    challengeId: c0.id,
    challengeTitle: c0.title,
    amount: c0.stake,
    beneficiaryName: c0.beneficiary.name,
    beneficiaryGroup: c0.beneficiary.group,
    beneficiaryEmoji: c0.beneficiary.emoji,
    date: '2026-05-08T00:00:00.000Z',
  }

  function saveProfile() {
    set({ name: name.trim() || state.name, bio: bio.trim(), goal: goal.trim() })
    setEditOpen(false)
    toast('저장했어요 ✨')
  }

  const growthCopy =
    ratio >= 1 ? '완성! 레벨 MAX ✦' : days === 0 ? '오늘부터 채워가요' : '함께 자라는 중'

  return (
    <div className="scroll">
      <header className="appbar">
        <div className="appbar__title">마이</div>
        <div className="row" style={{ gap: 8 }}>
          <IconButton label="컬러 설정" onClick={() => setColorOpen(true)}>
            <IconPalette />
          </IconButton>
          <IconButton label="기부증서" onClick={() => setCertOpen(true)} badge={state.certificates.length}>
            <IconSeal />
          </IconButton>
        </div>
      </header>

      <div className="page">
        {/* 성장 캐릭터 히어로 */}
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
          <GrowBuddy ratio={ratio} />
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: 'var(--accent-ink)' }}>
            챌린지 {days}일차
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3, letterSpacing: -0.4 }}>
            {growthCopy}
          </div>
          <div style={{ width: 'min(240px,80%)', marginTop: 14 }}>
            <div
              style={{
                height: 7,
                borderRadius: 6,
                background: 'var(--surface-sunken)',
                overflow: 'hidden',
              }}
            >
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
            <div className="muted" style={{ fontSize: 11.5, textAlign: 'center', marginTop: 7 }}>
              미션을 이어갈수록 아이가 또렷하게 채워져요 · {days}/{GROWTH_CAP}
            </div>
          </div>
        </div>

        {/* 챌린지 여정 아카이브 */}
        <div className="sec">
          <span className="sec__title">나의 챌린지 여정</span>
          <span className="sec__more">완주 {state.certificates.length}</span>
        </div>
        {journey.length === 0 ? (
          <div className="card" style={{ padding: '18px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13.5 }}>
            아직 시작한 챌린지가 없어요
          </div>
        ) : (
          <div className="hscroll">
            {journey.map(({ j, ch }) => {
              const cleared = state.certificates.some((c) => c.challengeId === ch.id)
              return (
                <div key={ch.id} style={{ textAlign: 'center', minWidth: 68 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 27,
                      background: 'var(--surface)',
                      border: `2.5px solid ${cleared ? 'var(--gold)' : 'var(--accent)'}`,
                      boxShadow: 'var(--shadow-sm)',
                      position: 'relative',
                    }}
                  >
                    {ch.emoji}
                    {cleared && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: -3,
                          right: -3,
                          fontSize: 15,
                          background: '#fff',
                          borderRadius: '50%',
                          lineHeight: 1,
                        }}
                      >
                        🏅
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, color: 'var(--ink-2)' }}>
                    {cleared ? '완주' : `${j.progress}/${ch.totalDays}일`}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 프로필 (하단) */}
        <div className="sec">
          <span className="sec__title">내 프로필</span>
          <button className="sec__more" onClick={() => setEditOpen(true)} style={{ color: 'var(--accent-ink)' }}>
            편집
          </button>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="row" style={{ gap: 12 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: type ? type.soft : 'var(--surface-2)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              {type?.emoji ?? '🎨'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{state.name || '이름 없음'}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.45 }}>
                {state.bio || '나를 소개하는 한 문장을 적어보세요'}
              </div>
            </div>
            {type && (
              <span className="chip" style={{ padding: '4px 10px', fontSize: 11, color: type.color }}>
                {type.code}
              </span>
            )}
          </div>
          <div
            className="row"
            style={{
              gap: 10,
              marginTop: 14,
              background: 'var(--surface-2)',
              borderRadius: 12,
              padding: '12px 14px',
            }}
          >
            <span style={{ fontSize: 17 }}>🎯</span>
            <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.5 }}>
              {state.goal || '아직 목표가 없어요'}
            </div>
          </div>
        </div>

        {/* 투자·기부 현황 (차분하게) */}
        <div className="card" style={{ marginTop: 12, padding: 18 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="muted" style={{ fontSize: 12, fontWeight: 700 }}>투자 가능한 열매</div>
              <div className="row" style={{ gap: 6, marginTop: 4, color: 'var(--sage)' }}>
                <IconSeed />
                <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.3 }}>
                  {fmt(state.seeds)}
                </span>
              </div>
            </div>
            <button
              className="btn btn--ghost"
              style={{ padding: '11px 15px', fontSize: 13 }}
              onClick={() => {
                set({ seeds: state.seeds + 10 })
                toast('열매 +10 채웠어요 🌱')
              }}
            >
              열매 채우기
            </button>
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: 8,
            }}
          >
            <MiniStat emoji="🎁" label="지금까지 기부한 열매" value={`${fmt(donatedTotal)}개`} />
            <MiniStat emoji="📜" label="발급된 기부증서" value={`${state.certificates.length}장`} />
          </div>
          <button
            onClick={() => setCertOpen(true)}
            style={{
              width: '100%',
              marginTop: 12,
              fontSize: 12.5,
              fontWeight: 700,
              color: 'var(--accent-ink)',
            }}
          >
            내 기부증서 보기 →
          </button>
        </div>

        {/* 활동 / 뱃지 탭 */}
        <div
          className="row"
          style={{ marginTop: 22, background: 'var(--surface-sunken)', borderRadius: 12, padding: 4 }}
        >
          {(['archive', 'badges'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 700,
                background: tab === t ? 'var(--surface)' : 'transparent',
                color: tab === t ? 'var(--ink)' : 'var(--ink-3)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                transition: 'all .18s',
              }}
            >
              {t === 'archive' ? `사유 아카이브 ${state.archive.length}` : `뱃지 ${earnedBadges.length}`}
            </button>
          ))}
        </div>

        {tab === 'archive' ? (
          <div className="stack" style={{ gap: 10, marginTop: 14 }}>
            {state.archive.length === 0 ? (
              <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--ink-3)' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🪶</div>
                <div style={{ fontWeight: 700, color: 'var(--ink-2)' }}>아직 기록이 없어요</div>
                <div style={{ fontSize: 13, marginTop: 3 }}>미션 인증 때 남긴 사유가 쌓여요</div>
              </div>
            ) : (
              state.archive.map((a) => {
                const ch = a.challengeId ? CHALLENGES.find((c) => c.id === a.challengeId) : undefined
                return (
                  <div key={a.id} className="card" style={{ padding: 15 }}>
                    <div className="row" style={{ gap: 7, marginBottom: 6 }}>
                      {ch && (
                        <span className="chip" style={{ padding: '2px 8px', fontSize: 10.5 }}>
                          {ch.emoji} {ch.title}
                        </span>
                      )}
                      <span className="muted" style={{ fontSize: 11.5, marginLeft: 'auto' }}>
                        {new Date(a.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>{a.text}</p>
                  </div>
                )
              })
            )}
          </div>
        ) : (
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {allBadges.map((b) => {
              const owned = state.badges.includes(b.id)
              return (
                <div
                  key={b.id}
                  className="card"
                  style={{
                    padding: '16px 8px',
                    textAlign: 'center',
                    opacity: owned ? 1 : 0.45,
                    filter: owned ? 'none' : 'grayscale(1)',
                  }}
                  title={b.desc}
                >
                  <div style={{ fontSize: 30 }}>{owned ? b.emoji : '🔒'}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>{b.name}</div>
                </div>
              )
            })}
          </div>
        )}

        <button
          className="muted"
          style={{ display: 'block', margin: '28px auto 4px', fontSize: 12.5, fontWeight: 600 }}
          onClick={() => {
            if (confirm('모든 데이터를 초기화하고 온보딩을 다시 할까요?')) reset()
          }}
        >
          데이터 초기화 (온보딩 다시하기)
        </button>
      </div>

      {/* 기부증서 시트 */}
      <Sheet open={certOpen} onClose={() => setCertOpen(false)} title="🌹 감사 카드 · 기부증서">
        <p className="muted" style={{ fontSize: 13, margin: '0 0 16px', lineHeight: 1.55 }}>
          챌린지를 완주하면 투자한 열매가 예술 소외계층에 전해지고, 그 나눔이
          감사 카드로 발급돼요. 어디에 전해졌는지도 확인할 수 있어요.
        </p>
        <div className="stack" style={{ gap: 16, paddingBottom: 4 }}>
          {state.certificates.map((c) => (
            <CertificateCard key={c.id} c={c} name={state.name} />
          ))}
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', margin: '4px 2px -4px' }}>
            {state.certificates.length ? '발급 예시' : '아직 발급 전 · 이렇게 전달돼요 (예시)'}
          </div>
          <CertificateCard c={sampleCert} name={state.name} sample />
        </div>
      </Sheet>

      {/* 컬러 설정 시트 */}
      <Sheet open={colorOpen} onClose={() => setColorOpen(false)} title="🎨 앱 전체 컬러">
        <p className="muted" style={{ fontSize: 13.5, margin: '0 0 16px', lineHeight: 1.5 }}>
          앱 전체 분위기를 나에게 어울리는 색으로 바꿔보세요. 마음에 드는 색을
          고르거나 직접 만들어 나만의 개성을 담아보세요.
        </p>

        {/* 직접 고르기 (커스텀) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: 14,
            borderRadius: 16,
            background: 'var(--surface-2)',
            marginBottom: 18,
          }}
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
              {state.themeId === CUSTOM_ID && state.customColor
                ? `현재 ${state.customColor.toUpperCase()}`
                : '색을 눌러 원하는 색을 골라요'}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10 }}>
          추천 팔레트
        </div>
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
                <span
                  className={active ? 'swatch is-active' : 'swatch'}
                  style={{ background: t.accent }}
                >
                  {active && (
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))' }}>
                      ✓
                    </span>
                  )}
                </span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: active ? 'var(--ink)' : 'var(--ink-3)' }}>
                  {t.name}
                </span>
              </button>
            )
          })}
        </div>
      </Sheet>

      {/* 프로필 편집 시트 */}
      <Sheet open={editOpen} onClose={() => setEditOpen(false)} title="프로필 편집">
        <div className="stack" style={{ gap: 16 }}>
          <EditField label="이름 / 닉네임">
            <input className="obInput" value={name} onChange={(e) => setName(e.target.value)} maxLength={16} />
          </EditField>
          <EditField label="나를 소개하는 한 문장">
            <input className="obInput" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={40} />
          </EditField>
          <EditField label="나의 목표">
            <textarea
              className="obInput"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={2}
              style={{ resize: 'none' }}
              maxLength={60}
            />
          </EditField>
        </div>
        <button className="btn btn--accent btn--block" style={{ marginTop: 18 }} onClick={saveProfile}>
          저장
        </button>
        <style>{`
          .obInput{width:100%;padding:14px 15px;border-radius:13px;border:1.6px solid var(--line-strong);
            background:var(--surface);font-size:15px;color:var(--ink);outline:none;transition:border-color .15s;}
          .obInput:focus{border-color:var(--accent);}
        `}</style>
      </Sheet>
    </div>
  )
}

function IconButton({
  children,
  onClick,
  label,
  badge,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
  badge?: number
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        position: 'relative',
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
      {badge !== undefined && badge > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            minWidth: 17,
            height: 17,
            padding: '0 4px',
            borderRadius: 999,
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 10.5,
            fontWeight: 800,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  )
}

function MiniStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 12, padding: '11px 12px' }}>
      <div className="muted" style={{ fontSize: 11, fontWeight: 700 }}>
        {emoji} {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>{value}</div>
    </div>
  )
}

const CARNATION_RED = '#c8322f'
const CARNATION_GREEN = '#4e7a49'

function Carnation({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 64" width={size} height={(size * 64) / 48} aria-hidden="true">
      {/* 줄기 */}
      <path d="M24 30 C24 42 24 50 24 60" stroke={CARNATION_GREEN} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* 잎 */}
      <path d="M24 45 C16 43 12 47 11 53 C19 53 24 50 24 45 Z" fill={CARNATION_GREEN} />
      <path d="M24 39 C31 37 36 40 37 45 C29 46 24 44 24 39 Z" fill={CARNATION_GREEN} />
      {/* 꽃받침 */}
      <path d="M19 27 L29 27 L26 34 L22 34 Z" fill={CARNATION_GREEN} />
      {/* 꽃 (러플) */}
      <path
        d="M9 24 Q10 7 24 6 Q38 7 39 24 Q33 16 29 21 Q31 10 24 15 Q17 10 19 21 Q15 16 9 24 Z"
        fill={CARNATION_RED}
      />
      <path
        d="M16 20 Q18 13 20 20 M24 11 L24 21 M28 20 Q30 13 32 20"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.55"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CertificateCard({ c, name, sample }: { c: Certificate; name: string; sample?: boolean }) {
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
      {sample && (
        <span
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: '#fff',
            border: `1px solid ${CARNATION_RED}55`,
            color: CARNATION_RED,
            fontSize: 10.5,
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: 999,
          }}
        >
          예시
        </span>
      )}

      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Carnation />
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2.5, color: CARNATION_RED, fontWeight: 800, marginTop: 4 }}>
          THANK YOU
        </div>
        <div style={{ fontSize: 23, fontWeight: 800, margin: '1px 0 0', letterSpacing: -0.5 }}>감사합니다</div>
      </div>

      <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--ink-2)', textAlign: 'center', margin: '12px 4px 16px' }}>
        <b style={{ color: 'var(--ink)' }}>{name || '회원'}</b>님의{' '}
        <b style={{ color: 'var(--ink)' }}>「{c.challengeTitle}」</b> 완주 덕분에,
        <br />
        아래 이웃에게 예술을 누릴 한 조각이 전해졌어요.
      </p>

      {/* 받은 곳 (명확히) + 전한 나눔 */}
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
          <div style={{ fontSize: 15, fontWeight: 800, color: CARNATION_RED }}>열매 {c.amount}</div>
        </div>
      </div>

      <div
        className="row"
        style={{ justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: 'var(--ink-3)' }}
      >
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>No. {c.serial}</span>
        <span>
          {new Date(c.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div style={{ marginTop: 8, textAlign: 'right', fontSize: 12.5, fontWeight: 800, letterSpacing: 0.5, color: CARNATION_RED }}>
        안디잇굿 나눔 🌹
      </div>
    </div>
  )
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="stack" style={{ gap: 7 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>{label}</span>
      {children}
    </label>
  )
}
