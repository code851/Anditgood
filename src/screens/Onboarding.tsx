import { useState } from 'react'
import { useStore } from '../store'
import {
  ART_TYPES,
  QUIZ,
  scoreQuiz,
  type ArtTypeId,
  type QuizOption,
} from '../data/artTypes'
import { ProgressBar } from '../components/ui'

type Step = 'intro' | 'quiz' | 'result' | 'profile'

export default function Onboarding() {
  const { completeOnboarding } = useStore()
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<QuizOption[]>([])
  const [qi, setQi] = useState(0)
  const [result, setResult] = useState<ArtTypeId | null>(null)

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [goal, setGoal] = useState('')

  function pick(opt: QuizOption) {
    const next = [...answers, opt]
    setAnswers(next)
    if (qi + 1 < QUIZ.length) {
      setQi(qi + 1)
    } else {
      const r = scoreQuiz(next)
      setResult(r)
      setGoal(ART_TYPES[r].starterGoal)
      setStep('result')
    }
  }

  function restart() {
    setAnswers([])
    setQi(0)
    setResult(null)
    setStep('quiz')
  }

  // ── 인트로 ──
  if (step === 'intro') {
    return (
      <div
        className="scroll"
        style={{
          background: 'linear-gradient(160deg,#f4efe7,#e9dccb)',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 18,
            paddingBottom: 40,
          }}
        >
          <div className="fadeUp" style={{ fontSize: 15, letterSpacing: 6, color: 'var(--accent-ink)', fontWeight: 700 }}>
            ART, EVERYDAY
          </div>
          <h1
            className="fadeUp"
            style={{
              fontSize: 40,
              lineHeight: 1.2,
              margin: 0,
              fontWeight: 800,
              letterSpacing: -1.2,
            }}
          >
            예술을
            <br />
            매일 누리는
            <br />
            가장 쉬운 방법
          </h1>
          <p className="fadeUp muted" style={{ fontSize: 15.5, lineHeight: 1.6, maxWidth: 320 }}>
            거창하지 않아도 괜찮아요. 작은 챌린지로 하루에 한 조각씩,
            예술을 일상으로 들여오는 습관을 만들어요.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '6px 0 4px' }}>
            {['🌙 몽상가', '🗂️ 큐레이터', '🎨 창작자', '🧭 탐험가'].map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <button className="btn btn--accent btn--block" onClick={() => setStep('quiz')} style={{ marginTop: 10 }}>
            내 예술 타입 알아보기 →
          </button>
          <p className="muted" style={{ fontSize: 12.5, textAlign: 'center' }}>
            약 40초 · 6문항
          </p>
        </div>
      </div>
    )
  }

  // ── 퀴즈 ──
  if (step === 'quiz') {
    const q = QUIZ[qi]
    return (
      <div className="scroll" style={{ padding: '0 24px' }}>
        <div style={{ paddingTop: 26 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="muted" style={{ fontWeight: 700, fontSize: 13 }}>
              {qi + 1} / {QUIZ.length}
            </span>
            <button className="muted" style={{ fontSize: 13, fontWeight: 600 }} onClick={restart}>
              처음부터
            </button>
          </div>
          <ProgressBar value={((qi + 1) / QUIZ.length) * 100} />
        </div>

        <h2
          key={qi}
          className="fadeUp"
          style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.35, margin: '34px 0 26px', letterSpacing: -0.5 }}
        >
          {q.q}
        </h2>

        <div key={`o${qi}`} className="fadeUp stack" style={{ gap: 11 }}>
          {q.options.map((o, i) => (
            <button
              key={i}
              className="card"
              onClick={() => pick(o)}
              style={{
                textAlign: 'left',
                padding: '18px 18px',
                fontSize: 15.5,
                fontWeight: 600,
                lineHeight: 1.45,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: '1.6px solid var(--line-strong)',
                  color: 'var(--ink-3)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── 결과 ──
  if (step === 'result' && result) {
    const t = ART_TYPES[result]
    return (
      <div className="scroll" style={{ padding: '0 24px 40px' }}>
        <div
          className="fadeUp"
          style={{
            marginTop: 30,
            borderRadius: 24,
            padding: '32px 24px',
            background: `linear-gradient(160deg, ${t.soft}, #fff)`,
            border: '1px solid var(--line)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 3, color: t.color, fontWeight: 800 }}>
            YOUR TYPE · {t.code}
          </div>
          <div style={{ fontSize: 78, margin: '10px 0 6px', animation: 'pop .5s ease both' }}>{t.emoji}</div>
          <h1 style={{ fontSize: 32, margin: '0 0 6px', fontWeight: 800, letterSpacing: -0.8 }}>
            {t.name}
          </h1>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.color }}>{t.tagline}</p>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            {t.keywords.map((k) => (
              <span key={k} className="chip" style={{ background: '#fff' }}>
                #{k}
              </span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-2)', margin: '22px 4px' }}>
          {t.description}
        </p>

        <div className="card" style={{ padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 22 }}>🎯</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 3 }}>
              추천 시작 목표
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.5 }}>{t.starterGoal}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button className="btn btn--ghost" onClick={restart} style={{ flex: '0 0 auto', padding: '15px 18px' }}>
            다시
          </button>
          <button
            className="btn btn--accent"
            style={{ flex: 1 }}
            onClick={() => setStep('profile')}
          >
            이 타입으로 시작하기
          </button>
        </div>
      </div>
    )
  }

  // ── 프로필 ──
  const t = result ? ART_TYPES[result] : null
  const canFinish = name.trim().length > 0
  return (
    <div className="scroll" style={{ padding: '0 24px 40px' }}>
      <div style={{ paddingTop: 34 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, margin: '0 0 6px', letterSpacing: -0.6 }}>
          프로필을 완성해요
        </h1>
        <p className="muted" style={{ fontSize: 14.5, margin: 0 }}>
          {t?.emoji} {t?.name}의 여정을 함께 기록할게요.
        </p>
      </div>

      <div className="stack" style={{ gap: 20, marginTop: 26 }}>
        <Field label="이름 / 닉네임" required>
          <input
            className="obInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 지안"
            maxLength={16}
          />
        </Field>

        <Field label="나를 소개하는 한 문장">
          <input
            className="obInput"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="예: 퇴근길 그림 한 점으로 숨 쉬는 사람"
            maxLength={40}
          />
        </Field>

        <Field label="나의 목표">
          <textarea
            className="obInput"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={2}
            style={{ resize: 'none' }}
            maxLength={60}
          />
        </Field>
      </div>

      <button
        className="btn btn--accent btn--block"
        disabled={!canFinish}
        style={{ marginTop: 28 }}
        onClick={() =>
          result &&
          completeOnboarding({
            type: result,
            name: name.trim(),
            bio: bio.trim(),
            goal: goal.trim(),
          })
        }
      >
        시작하기 ✨
      </button>
      <p className="muted" style={{ fontSize: 12.5, textAlign: 'center', marginTop: 12 }}>
        가입 축하 캐시 20,000 지급 · 첫 뱃지 🌱 획득
      </p>

      <style>{`
        .obInput{
          width:100%;
          padding:15px 16px;
          border-radius:14px;
          border:1.6px solid var(--line-strong);
          background:var(--surface);
          font-size:15.5px;
          color:var(--ink);
          outline:none;
          transition:border-color .15s;
        }
        .obInput:focus{border-color:var(--accent);}
        .obInput::placeholder{color:var(--ink-3);}
      `}</style>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="stack" style={{ gap: 8 }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-2)' }}>
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </span>
      {children}
    </label>
  )
}
