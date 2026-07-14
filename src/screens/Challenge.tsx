import { useState } from 'react'
import { useStore } from '../store'
import {
  CHALLENGES,
  DONATION_TARGETS,
  dailyMission,
  type Challenge,
  type DonationTarget,
} from '../data/content'
import { Sheet, fmt, useToast } from '../components/ui'
import { IconCheck, IconPlus } from '../components/icons'
import { currencyEmoji } from '../data/currency'

interface ActiveItem {
  ch: Challenge
  progress: number
  stake: number
  done?: boolean
}

export default function ChallengeScreen() {
  const { state, joinChallenge, checkInChallenge, finalizeDonation } = useStore()
  const toast = useToast()
  const currency = state.currencyLabel
  const curEmoji = currencyEmoji(currency)

  // 시트 / 오버레이 상태
  const [investFor, setInvestFor] = useState<Challenge | null>(null)
  const [investAmt, setInvestAmt] = useState(1)
  const [checkInItem, setCheckInItem] = useState<ActiveItem | null>(null)
  const [note, setNote] = useState('')
  const [donateItem, setDonateItem] = useState<ActiveItem | null>(null)
  const [donateStep, setDonateStep] = useState<'target' | 'message'>('target')
  const [selTarget, setSelTarget] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState<{ name: string; amount: number } | null>(null)

  const active: ActiveItem[] = state.joined
    .filter((j) => !j.done)
    .map((j) => ({ ...j, ch: CHALLENGES.find((c) => c.id === j.challengeId)! }))
    .filter((x) => x.ch)
  const inProgress = active.filter((x) => x.progress < x.ch.totalDays)
  const awaiting = active.filter((x) => x.progress >= x.ch.totalDays)
  const usedIds = new Set(state.joined.map((j) => j.challengeId))
  const explore = CHALLENGES.filter((c) => !usedIds.has(c.id))

  const heroItem: ActiveItem | null = awaiting[0] ?? inProgress[0] ?? null
  const heroIsCompletion = !!awaiting[0]
  const others = active.filter((x) => x.ch.id !== heroItem?.ch.id)

  function openInvest(ch: Challenge) {
    setInvestAmt(Math.max(1, Math.min(ch.suggested, state.seeds)))
    setInvestFor(ch)
  }
  function doInvest() {
    if (!investFor) return
    joinChallenge(investFor.id, investAmt)
    toast(`${investFor.title} 여정을 시작했어요 🌱`)
    setInvestFor(null)
  }
  function openCheckIn(item: ActiveItem) {
    setNote('')
    setCheckInItem(item)
  }
  function submitCheckIn() {
    if (!checkInItem) return
    const res = checkInChallenge(checkInItem.ch.id, note.trim() || undefined)
    setCheckInItem(null)
    if (res.completed) {
      toast('🎉 완주! 이제 나눔을 전할 차례예요')
      openDonate({ ...checkInItem, progress: res.day })
    } else {
      toast(`Day ${res.day} 완료 🔥 오늘도 잘했어요`)
    }
  }
  function openDonate(item: ActiveItem) {
    setSelTarget(null)
    setMessage('')
    setDonateStep('target')
    setDonateItem(item)
  }
  function completeDonation() {
    if (!donateItem || !selTarget) return
    const tg = DONATION_TARGETS.find((t) => t.id === selTarget)!
    finalizeDonation({ challengeId: donateItem.ch.id, targetId: selTarget, message })
    setDonateItem(null)
    setFeedback({ name: tg.name, amount: donateItem.stake })
  }

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">오늘의 예술 미션</div>
          <div className="appbar__sub">30일, 매일의 예술로 나를 발견해요</div>
        </div>
        <div className="chip chip--accent" title={`투자 가능한 ${currency}`}>
          <span style={{ fontSize: 15 }}>{curEmoji}</span>
          {fmt(state.seeds)}
        </div>
      </header>

      <div className="page">
        {/* ── 히어로: 오늘 수행할 미션을 크게 ── */}
        {heroItem ? (
          heroIsCompletion ? (
            <CompletionHero item={heroItem} currency={currency} onDonate={() => openDonate(heroItem)} />
          ) : (
            <TodayHero item={heroItem} onCheckIn={() => openCheckIn(heroItem)} />
          )
        ) : (
          <div
            className="card fadeUp"
            style={{ padding: '30px 22px', textAlign: 'center', background: 'linear-gradient(160deg,var(--accent-soft),#fff)' }}
          >
            <div style={{ fontSize: 40 }}>🎨</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>오늘의 예술 미션을 시작해볼까요?</div>
            <div className="muted" style={{ fontSize: 13.5, marginTop: 5, lineHeight: 1.5 }}>
              아래에서 30일 여정을 하나 골라 가치를 투자하고 시작해요.
            </div>
          </div>
        )}

        {/* ── 진행 중(그 외) — 히어로와 구분되는 컴팩트 리스트 ── */}
        {others.length > 0 && (
          <>
            <div className="sec">
              <span className="sec__title">진행 중인 다른 챌린지</span>
              <span className="sec__more">{others.length}</span>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              {others.map((x) => {
                const complete = x.progress >= x.ch.totalDays
                return (
                  <button
                    key={x.ch.id}
                    className="card"
                    onClick={() => (complete ? openDonate(x) : openCheckIn(x))}
                    style={{ padding: 14, textAlign: 'left', display: 'flex', gap: 12, alignItems: 'center' }}
                  >
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 13, flexShrink: 0, fontSize: 22,
                        display: 'grid', placeItems: 'center', color: '#fff', background: x.ch.gradient,
                      }}
                    >
                      {x.ch.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 14.5 }}>{x.ch.title}</div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>
                        {complete ? '완주 · 기부 대상 고르기' : `Day ${x.progress}/${x.ch.totalDays}`}
                      </div>
                      {!complete && (
                        <div style={{ height: 5, borderRadius: 4, background: 'var(--surface-sunken)', marginTop: 6, overflow: 'hidden' }}>
                          <div style={{ width: `${(x.progress / x.ch.totalDays) * 100}%`, height: '100%', background: x.ch.color }} />
                        </div>
                      )}
                    </div>
                    <span style={{ color: complete ? 'var(--accent)' : 'var(--ink-3)', fontWeight: 800 }}>
                      {complete ? '🎁' : '›'}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── 새로운 챌린지 — 시각적으로 풍부한 그리드 (뚜렷이 구분) ── */}
        {explore.length > 0 && (
          <>
            <div className="sec" style={{ marginTop: 28 }}>
              <span className="sec__title">새로운 예술 여정</span>
              <span className="sec__more">투자하고 30일 도전</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {explore.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => openInvest(ch)}
                  style={{
                    position: 'relative',
                    borderRadius: 18,
                    overflow: 'hidden',
                    textAlign: 'left',
                    aspectRatio: '3 / 4',
                    background: ch.gradient,
                    color: '#fff',
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontSize: 10.5, fontWeight: 800, background: 'rgba(0,0,0,.25)',
                        padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(3px)',
                      }}
                    >
                      #{ch.tag}
                    </span>
                    <span style={{ fontSize: 30, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.3))' }}>{ch.emoji}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.3 }}>{ch.title}</div>
                    <div style={{ fontSize: 11.5, opacity: 0.92, marginTop: 5 }}>
                      {ch.totalDays}일 · {fmt(ch.participants)}명 함께
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Step 1: 가치 투자 시트 ── */}
      <Sheet open={!!investFor} onClose={() => setInvestFor(null)} title={investFor ? `${investFor.emoji} ${investFor.title}` : ''}>
        {investFor && (
          <>
            <div className="row" style={{ gap: 6, marginBottom: 12 }}>
              <span className="chip" style={{ padding: '3px 10px', fontSize: 11 }}>#{investFor.tag}</span>
              <span className="chip" style={{ padding: '3px 10px', fontSize: 11 }}>{investFor.totalDays}일</span>
              <span className="muted" style={{ fontSize: 11.5 }}>{fmt(investFor.participants)}명 함께</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: '0 0 18px' }}>{investFor.intro}</p>

            <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 14.5, fontWeight: 800 }}>
                이 챌린지에 얼마만큼의 {currency}을 투자하시겠습니까?
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>완주하면 전액, 원하는 곳에 기부돼요</div>
              <div className="row" style={{ justifyContent: 'center', gap: 20, margin: '16px 0 6px' }}>
                <StepBtn label="−" onClick={() => setInvestAmt((a) => Math.max(1, a - 1))} disabled={investAmt <= 1} />
                <div style={{ minWidth: 92, textAlign: 'center' }}>
                  <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
                    {curEmoji} {investAmt}
                  </div>
                </div>
                <StepBtn
                  label="+"
                  onClick={() => setInvestAmt((a) => Math.min(state.seeds, a + 1))}
                  disabled={investAmt >= state.seeds}
                />
              </div>
              <div className="muted" style={{ fontSize: 12 }}>보유 {fmt(state.seeds)} {currency}</div>
            </div>

            <button
              className="btn btn--accent btn--block"
              style={{ marginTop: 18 }}
              disabled={state.seeds < 1 || investAmt > state.seeds}
              onClick={doInvest}
            >
              {state.seeds < 1 ? `${currency}이 부족해요` : `${curEmoji} ${investAmt} 투자하고 시작하기`}
            </button>
          </>
        )}
      </Sheet>

      {/* ── Step 2: 오늘의 미션 인증 시트 ── */}
      <Sheet
        open={!!checkInItem}
        onClose={() => setCheckInItem(null)}
        title={checkInItem ? `${checkInItem.ch.emoji} Day ${checkInItem.progress + 1}` : ''}
      >
        {checkInItem && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-ink)', marginBottom: 8 }}>오늘의 미션</div>
            <div
              style={{
                fontSize: 16, fontWeight: 700, lineHeight: 1.55, color: 'var(--ink)',
                background: 'var(--surface-2)', borderRadius: 14, padding: '16px 16px', marginBottom: 16,
              }}
            >
              {dailyMission(checkInItem.ch, checkInItem.progress)}
            </div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>오늘의 기록 (선택)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="느낀 점이나 오늘의 표현을 남겨보세요."
              style={{
                width: '100%', marginTop: 8, padding: 14, borderRadius: 14, border: '1.6px solid var(--line-strong)',
                fontSize: 15, resize: 'none', outline: 'none', color: 'var(--ink)',
              }}
            />
            <button className="btn btn--accent btn--block" style={{ marginTop: 14 }} onClick={submitCheckIn}>
              <IconCheck /> 오늘 미션 완료
            </button>
          </>
        )}
      </Sheet>

      {/* ── Step 3·4: 기부 대상 선택 + 한 마디 (전체 화면) ── */}
      {donateItem && (
        <DonationWizard
          item={donateItem}
          currency={currency}
          step={donateStep}
          selTarget={selTarget}
          message={message}
          onSelect={setSelTarget}
          onNext={() => setDonateStep('message')}
          onBack={() => (donateStep === 'message' ? setDonateStep('target') : setDonateItem(null))}
          onMessage={setMessage}
          onComplete={completeDonation}
        />
      )}

      {/* ── Step 4: 전달 완료 피드백 ── */}
      {feedback && (
        <div
          onClick={() => setFeedback(null)}
          style={{
            position: 'absolute', inset: 0, zIndex: 90, background: 'rgba(30,22,16,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 26,
            animation: 'fadeUp .25s ease both',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface)', borderRadius: 24, padding: '30px 24px', textAlign: 'center',
              boxShadow: 'var(--shadow-lg)', maxWidth: 340, animation: 'pop .35s ease both',
            }}
          >
            <div style={{ fontSize: 52 }}>🎉</div>
            <p style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.55, margin: '12px 0 6px' }}>
              방금 <span style={{ color: 'var(--accent-ink)' }}>{feedback.name}</span>에게
              <br />
              당신의 {currency} <span style={{ color: 'var(--accent-ink)' }}>{feedback.amount}개</span>가 전달되었습니다!
            </p>
            <p className="muted" style={{ fontSize: 13, lineHeight: 1.55, margin: '0 0 20px' }}>
              감사 카드(기부증서)와 뱃지가 마이페이지에 등록됐어요 🌹
            </p>
            <button className="btn btn--accent btn--block" onClick={() => setFeedback(null)}>
              새로운 여정 보기 →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function TodayHero({ item, onCheckIn }: { item: ActiveItem; onCheckIn: () => void }) {
  const { ch, progress } = item
  const pct = (progress / ch.totalDays) * 100
  return (
    <div
      className="fadeUp"
      style={{
        borderRadius: 24, overflow: 'hidden', color: '#fff', background: ch.gradient,
        padding: '22px 22px 24px', boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: 11.5, fontWeight: 800, background: 'rgba(0,0,0,.22)', padding: '5px 11px',
            borderRadius: 999, letterSpacing: 0.3,
          }}
        >
          오늘의 미션 · Day {progress + 1}/{ch.totalDays}
        </span>
        <span style={{ fontSize: 30 }}>{ch.emoji}</span>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, opacity: 0.92, marginTop: 16 }}>{ch.title}</div>
      <div style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.4, marginTop: 6, letterSpacing: -0.4 }}>
        {dailyMission(ch, progress)}
      </div>
      <div style={{ height: 7, borderRadius: 6, background: 'rgba(255,255,255,.3)', overflow: 'hidden', margin: '18px 0 16px' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#fff', borderRadius: 6 }} />
      </div>
      <button
        onClick={onCheckIn}
        className="btn btn--block"
        style={{ background: '#fff', color: 'var(--ink)', fontWeight: 800 }}
      >
        <IconCheck /> 오늘 미션 인증하기
      </button>
    </div>
  )
}

function CompletionHero({ item, currency, onDonate }: { item: ActiveItem; currency: string; onDonate: () => void }) {
  const { ch, stake } = item
  return (
    <div
      className="fadeUp"
      style={{
        borderRadius: 24, color: '#fff', background: ch.gradient, padding: '26px 22px',
        textAlign: 'center', boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ fontSize: 44 }}>🎉</div>
      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>「{ch.title}」 완주!</div>
      <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.95, margin: '8px 0 18px' }}>
        {ch.totalDays}일의 여정을 해냈어요. 투자한 {currency} {stake}개를
        <br />
        이제 필요한 곳에 전할 차례예요.
      </p>
      <button onClick={onDonate} className="btn btn--block" style={{ background: '#fff', color: 'var(--ink)', fontWeight: 800 }}>
        🎁 기부 대상 고르기
      </button>
    </div>
  )
}

function DonationWizard({
  item, currency, step, selTarget, message, onSelect, onNext, onBack, onMessage, onComplete,
}: {
  item: ActiveItem
  currency: string
  step: 'target' | 'message'
  selTarget: string | null
  message: string
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
  onMessage: (v: string) => void
  onComplete: () => void
}) {
  const target: DonationTarget | undefined = DONATION_TARGETS.find((t) => t.id === selTarget)
  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 80, background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', animation: 'fadeUp .22s ease both',
      }}
    >
      <header className="appbar" style={{ gap: 10, alignItems: 'center' }}>
        <button onClick={onBack} aria-label="뒤로" style={{ fontSize: 24, lineHeight: 1, color: 'var(--ink)' }}>‹</button>
        <div className="appbar__title" style={{ fontSize: 16 }}>
          {step === 'target' ? '기부 대상 선택' : '한 마디 남기기'}
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 20px' }}>
        {step === 'target' ? (
          <>
            <p style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.5, margin: '8px 4px 16px', letterSpacing: -0.4 }}>
              {item.stake}개의 {currency}을(를)
              <br />
              누구에게 전달하시겠습니까?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {DONATION_TARGETS.map((t) => {
                const on = selTarget === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    style={{
                      textAlign: 'left', borderRadius: 18, overflow: 'hidden', background: 'var(--surface)',
                      border: on ? '2.5px solid var(--accent)' : '1px solid var(--line)', padding: 0,
                    }}
                  >
                    <div
                      style={{
                        height: 92, background: t.gradient, display: 'grid', placeItems: 'center',
                        fontSize: 40, position: 'relative',
                      }}
                    >
                      <span style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.25))' }}>{t.emoji}</span>
                      {on && (
                        <span
                          style={{
                            position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%',
                            background: 'var(--accent)', color: '#fff', display: 'grid', placeItems: 'center',
                            fontSize: 13, fontWeight: 900,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800 }}>{t.name}</div>
                      <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>{t.group}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.45, marginTop: 6 }}>{t.blurb}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <>
            {target && (
              <div
                className="row"
                style={{ gap: 12, background: 'var(--surface-2)', borderRadius: 14, padding: '12px 14px', margin: '10px 0 16px' }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: target.gradient, display: 'grid', placeItems: 'center', fontSize: 24 }}>
                  {target.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800 }}>{target.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{target.group}</div>
                </div>
              </div>
            )}
            <label style={{ fontSize: 15, fontWeight: 800 }}>
              {target?.name}에게 따뜻한 한 마디를 남겨주세요
            </label>
            <textarea
              value={message}
              onChange={(e) => onMessage(e.target.value)}
              rows={5}
              placeholder="예: 오늘 제가 발견한 예술의 기쁨이, 당신에게도 작은 빛이 되길 바라요."
              style={{
                width: '100%', marginTop: 12, padding: 15, borderRadius: 16, border: '1.6px solid var(--line-strong)',
                fontSize: 15, lineHeight: 1.6, resize: 'none', outline: 'none', color: 'var(--ink)',
              }}
            />
          </>
        )}
      </div>

      <div style={{ padding: '10px 20px calc(14px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--line)' }}>
        {step === 'target' ? (
          <button className="btn btn--accent btn--block" disabled={!selTarget} onClick={onNext}>
            이 대상에게 전달하기 →
          </button>
        ) : (
          <button className="btn btn--accent btn--block" onClick={onComplete}>
            <IconPlus /> {currency} {item.stake}개 전달 완료
          </button>
        )}
      </div>
    </div>
  )
}

function StepBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 46, height: 46, borderRadius: '50%', border: '1.6px solid var(--line-strong)',
        background: 'var(--surface)', fontSize: 24, fontWeight: 700, color: 'var(--ink)',
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {label}
    </button>
  )
}
