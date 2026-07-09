import { useState } from 'react'
import { useStore } from '../store'
import { ART_TYPES } from '../data/artTypes'
import { CHALLENGES, BADGES, type Badge } from '../data/content'
import { Sheet, fmt, useToast } from '../components/ui'
import { IconCoin } from '../components/icons'

export default function MyPage() {
  const { state, set, reset } = useStore()
  const toast = useToast()
  const [editOpen, setEditOpen] = useState(false)
  const [name, setName] = useState(state.name)
  const [bio, setBio] = useState(state.bio)
  const [goal, setGoal] = useState(state.goal)
  const [tab, setTab] = useState<'archive' | 'badges'>('archive')

  const type = state.type ? ART_TYPES[state.type] : null
  const clearedCount = state.joined.filter((j) => {
    const ch = CHALLENGES.find((c) => c.id === j.challengeId)
    return ch && j.progress >= ch.totalDays
  }).length

  const earnedBadges = state.badges.map((id) => BADGES[id]).filter(Boolean) as Badge[]
  const allBadges = Object.values(BADGES)

  function saveProfile() {
    set({ name: name.trim() || state.name, bio: bio.trim(), goal: goal.trim() })
    setEditOpen(false)
    toast('프로필을 저장했어요 ✨')
  }

  return (
    <div className="scroll">
      <header className="appbar">
        <div className="appbar__title">마이페이지</div>
        <button className="chip" onClick={() => setEditOpen(true)}>
          프로필 편집
        </button>
      </header>

      <div className="page">
        {/* 프로필 카드 */}
        <div
          className="card fadeUp"
          style={{
            padding: 22,
            background: type ? `linear-gradient(160deg, ${type.soft}, #fff 65%)` : 'var(--surface)',
          }}
        >
          <div className="row" style={{ gap: 14 }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 20,
                background: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 34,
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0,
              }}
            >
              {type?.emoji ?? '🎨'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.4 }}>
                {state.name || '이름 없음'}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 3, lineHeight: 1.45 }}>
                {state.bio || '나를 소개하는 한 문장을 적어보세요'}
              </div>
              {type && (
                <span
                  className="chip"
                  style={{ marginTop: 9, background: '#fff', color: type.color, fontWeight: 700, padding: '4px 11px', fontSize: 12 }}
                >
                  {type.emoji} {type.name} · {type.code}
                </span>
              )}
            </div>
          </div>

          {/* 지표 */}
          <div className="row" style={{ marginTop: 18, gap: 8 }}>
            <Stat label="연속" value={`${state.streak}일`} />
            <Stat label="완주" value={`${clearedCount}개`} />
            <Stat label="뱃지" value={`${earnedBadges.length}개`} />
          </div>
        </div>

        {/* 캐시 */}
        <div
          className="card"
          style={{
            marginTop: 12,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(120deg,#201b16,#3a3129)',
            color: '#fff',
            border: 'none',
          }}
        >
          <div>
            <div style={{ fontSize: 12.5, opacity: 0.7, fontWeight: 600 }}>내 캐시 · 투자금</div>
            <div className="row" style={{ gap: 6, marginTop: 4 }}>
              <span style={{ color: 'var(--gold)' }}>
                <IconCoin />
              </span>
              <span style={{ fontSize: 25, fontWeight: 800, letterSpacing: -0.5 }}>
                {fmt(state.cash)}
              </span>
            </div>
          </div>
          <button
            className="btn"
            style={{ background: '#fff', color: 'var(--ink)', padding: '11px 16px', fontSize: 13.5 }}
            onClick={() => {
              set({ cash: state.cash + 10000 })
              toast('충전 완료 · +10,000 (데모)')
            }}
          >
            충전
          </button>
        </div>

        {/* 목표 */}
        <div className="card" style={{ marginTop: 12, padding: 18, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-3)' }}>나의 목표</div>
            <div style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.5, marginTop: 3 }}>
              {state.goal || '아직 목표가 없어요'}
            </div>
          </div>
        </div>

        {/* 탭: 아카이브 / 뱃지 */}
        <div
          className="row"
          style={{
            marginTop: 22,
            background: 'var(--surface-sunken)',
            borderRadius: 12,
            padding: 4,
          }}
        >
          {(['archive', 'badges'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 9,
                fontSize: 13.5,
                fontWeight: 700,
                background: tab === t ? 'var(--surface)' : 'transparent',
                color: tab === t ? 'var(--ink)' : 'var(--ink-3)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                transition: 'all .18s',
              }}
            >
              {t === 'archive' ? `활동·사유 아카이브 ${state.archive.length}` : `뱃지 ${earnedBadges.length}`}
            </button>
          ))}
        </div>

        {tab === 'archive' ? (
          <div className="stack" style={{ gap: 10, marginTop: 14 }}>
            {state.archive.length === 0 ? (
              <div
                className="card"
                style={{ padding: '26px 20px', textAlign: 'center', color: 'var(--ink-3)' }}
              >
                <div style={{ fontSize: 30, marginBottom: 6 }}>🪶</div>
                <div style={{ fontWeight: 700, color: 'var(--ink-2)' }}>아직 기록이 없어요</div>
                <div style={{ fontSize: 13, marginTop: 3 }}>
                  챌린지 인증 때 남긴 사유가 여기 쌓여요
                </div>
              </div>
            ) : (
              state.archive.map((a) => {
                const ch = a.challengeId
                  ? CHALLENGES.find((c) => c.id === a.challengeId)
                  : undefined
                return (
                  <div key={a.id} className="card" style={{ padding: 15 }}>
                    <div className="row" style={{ gap: 7, marginBottom: 6 }}>
                      {ch && (
                        <span className="chip" style={{ padding: '2px 8px', fontSize: 10.5 }}>
                          {ch.emoji} {ch.title}
                        </span>
                      )}
                      <span className="muted" style={{ fontSize: 11.5, marginLeft: 'auto' }}>
                        {new Date(a.date).toLocaleDateString('ko-KR', {
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)' }}>
                      {a.text}
                    </p>
                  </div>
                )
              })
            )}
          </div>
        ) : (
          <div
            style={{
              marginTop: 14,
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 10,
            }}
          >
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
                  <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>
                    {b.name}
                  </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(255,255,255,.6)',
        borderRadius: 13,
        padding: '12px 8px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3 }}>{value}</div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>
        {label}
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
