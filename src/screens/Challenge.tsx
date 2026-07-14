import { useState } from 'react'
import { useStore } from '../store'
import { CHALLENGES, type Challenge } from '../data/content'
import { Sheet, ProgressBar, fmt, useToast } from '../components/ui'
import { IconCheck, IconPlus } from '../components/icons'
import { currencyEmoji } from '../data/currency'

export default function ChallengeScreen() {
  const { state, joinChallenge, checkInChallenge } = useStore()
  const toast = useToast()
  const [active, setActive] = useState<Challenge | null>(null)
  const [note, setNote] = useState('')
  const currency = state.currencyLabel
  const curEmoji = currencyEmoji(currency)

  const joinedIds = new Set(state.joined.map((j) => j.challengeId))
  const joined = state.joined
    .map((j) => ({ j, ch: CHALLENGES.find((c) => c.id === j.challengeId)! }))
    .filter((x) => x.ch)
  const explore = CHALLENGES.filter((c) => !joinedIds.has(c.id))

  const todayStr = localDate()

  function openCheckIn(ch: Challenge) {
    setNote('')
    setActive(ch)
  }

  function submitCheckIn() {
    if (!active) return
    const j = state.joined.find((x) => x.challengeId === active.id)
    if (j?.lastCheck === todayStr) {
      toast('오늘은 이미 인증했어요 ✨')
      setActive(null)
      return
    }
    const res = checkInChallenge(active.id, note.trim() || undefined)
    if (res.donated && res.certificate) {
      toast(`완주! 🎁 ${currency}이 ${res.certificate.beneficiaryGroup}에게 기부됐어요`)
    } else {
      toast('오늘의 미션 완료 🔥 잘하고 있어요')
    }
    setActive(null)
  }

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">미션 · 챌린지</div>
          <div className="appbar__sub">오늘도 예술 한 조각, 해볼까요?</div>
        </div>
        <div className="chip chip--accent" title={`투자 가능한 ${currency}`}>
          <span style={{ fontSize: 15 }}>{curEmoji}</span>
          {fmt(state.seeds)}
        </div>
      </header>

      <div className="page">
        {/* 진행 중 */}
        <div className="sec">
          <span className="sec__title">진행 중인 챌린지</span>
          <span className="sec__more">{joined.length}개</span>
        </div>

        {joined.length === 0 ? (
          <div
            className="card"
            style={{ padding: '28px 20px', textAlign: 'center', color: 'var(--ink-3)' }}
          >
            <div style={{ fontSize: 34, marginBottom: 8 }}>🌱</div>
            <div style={{ fontWeight: 700, color: 'var(--ink-2)' }}>아직 참여한 챌린지가 없어요</div>
            <div style={{ fontSize: 13.5, marginTop: 4 }}>아래에서 하나 골라 시작해보세요</div>
          </div>
        ) : (
          <div className="stack" style={{ gap: 12 }}>
            {joined.map(({ j, ch }) => {
              const done = j.progress >= ch.totalDays
              const checkedToday = j.lastCheck === todayStr
              const pct = (j.progress / ch.totalDays) * 100
              return (
                <div key={ch.id} className="card" style={{ padding: 18 }}>
                  <div className="row" style={{ gap: 12 }}>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: 'var(--surface-2)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {ch.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 15.5 }}>{ch.title}</div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>
                        {j.progress} / {ch.totalDays}일 · {currency} {fmt(ch.stake)} 투자
                      </div>
                    </div>
                  </div>

                  <div style={{ margin: '14px 0 12px' }}>
                    <ProgressBar value={pct} />
                  </div>

                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: 'var(--ink-2)',
                      background: 'var(--surface-2)',
                      borderRadius: 12,
                      padding: '12px 14px',
                      marginBottom: 12,
                    }}
                  >
                    <b style={{ color: 'var(--accent-ink)' }}>오늘의 미션</b> · {ch.today}
                  </div>

                  {done ? (
                    <div
                      className="btn btn--ghost btn--block"
                      style={{ color: 'var(--sage)', cursor: 'default' }}
                    >
                      <IconCheck /> 완주 · {currency} {fmt(ch.stake)} {ch.beneficiary.group}에 기부됨
                    </div>
                  ) : (
                    <button
                      className={checkedToday ? 'btn btn--ghost btn--block' : 'btn btn--accent btn--block'}
                      onClick={() => !checkedToday && openCheckIn(ch)}
                      disabled={checkedToday}
                      style={checkedToday ? { color: 'var(--sage)' } : undefined}
                    >
                      {checkedToday ? (
                        <>
                          <IconCheck /> 오늘 인증 완료
                        </>
                      ) : (
                        '오늘 미션 인증하기'
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* 탐색 */}
        {explore.length > 0 && (
          <>
            <div className="sec">
              <span className="sec__title">새로운 챌린지</span>
              <span className="sec__more">투자하고 완주하면 기부로</span>
            </div>
            <div className="stack" style={{ gap: 12 }}>
              {explore.map((ch) => (
                <div key={ch.id} className="card" style={{ padding: 18 }}>
                  <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: 'var(--surface-2)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }}
                    >
                      {ch.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="row" style={{ gap: 6 }}>
                        <span className="chip" style={{ padding: '3px 9px', fontSize: 11 }}>
                          #{ch.tag}
                        </span>
                        <span className="muted" style={{ fontSize: 11.5 }}>
                          {fmt(ch.participants)}명 참여
                        </span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 16, marginTop: 6 }}>{ch.title}</div>
                      <div className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 3 }}>
                        {ch.summary}
                      </div>
                    </div>
                  </div>

                  {/* 투자 → 기부 안내 */}
                  <div
                    className="row"
                    style={{
                      gap: 9,
                      marginTop: 13,
                      background: 'var(--accent-soft)',
                      borderRadius: 12,
                      padding: '11px 13px',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{ch.beneficiary.emoji}</span>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--accent-ink)' }}>
                      {currency} <b>{fmt(ch.stake)}</b>을 투자해 나를 위한 경험을 사고, 완주하면{' '}
                      <b>{ch.beneficiary.group}</b>에게 그대로 기부돼요.
                    </div>
                  </div>

                  <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
                    <button
                      className="btn btn--accent"
                      style={{ padding: '11px 18px', fontSize: 13.5 }}
                      disabled={state.seeds < ch.stake}
                      onClick={() => {
                        joinChallenge(ch.id)
                        toast(`'${ch.title}' 참여 시작!`)
                      }}
                    >
                      <IconPlus />
                      {state.seeds < ch.stake ? `${currency} 부족` : `${currency} ${fmt(ch.stake)} 투자하기`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 인증 시트 */}
      <Sheet open={!!active} onClose={() => setActive(null)} title={active ? `${active.emoji} ${active.title}` : ''}>
        {active && (
          <>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--ink-2)',
                background: 'var(--surface-2)',
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 16,
              }}
            >
              {active.today}
            </div>
            <label style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-2)' }}>
              오늘의 기록 (선택)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="느낀 점이나 사유를 남기면 아카이브에 저장돼요."
              style={{
                width: '100%',
                marginTop: 8,
                padding: 14,
                borderRadius: 14,
                border: '1.6px solid var(--line-strong)',
                fontSize: 15,
                resize: 'none',
                outline: 'none',
                color: 'var(--ink)',
              }}
            />
            <button className="btn btn--accent btn--block" style={{ marginTop: 14 }} onClick={submitCheckIn}>
              <IconCheck /> 인증 완료
            </button>
          </>
        )}
      </Sheet>
    </div>
  )
}

function localDate(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`
}
