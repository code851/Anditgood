import { useState } from 'react'
import { useStore } from '../store'
import { COMMUNITIES, type Community } from '../data/content'
import { fmt, useToast } from '../components/ui'
import { IconPeople, IconChat, IconSpark } from '../components/icons'

type Filter = '전체' | '오픈' | '지정'

export default function CommunityScreen() {
  const { state, toggleGroup } = useStore()
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('전체')

  const list =
    filter === '전체' ? COMMUNITIES : COMMUNITIES.filter((c) => c.kind === filter)
  const myGroups = COMMUNITIES.filter((c) => state.joinedGroups.includes(c.id))

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">커뮤니티</div>
          <div className="appbar__sub">함께 누리면 오래 가요</div>
        </div>
        <div className="chip chip--accent">
          <IconPeople /> {myGroups.length}
        </div>
      </header>

      <div className="page">
        {/* 내 그룹 */}
        {myGroups.length > 0 && (
          <>
            <div className="sec">
              <span className="sec__title">내 그룹</span>
            </div>
            <div className="hscroll">
              {myGroups.map((g) => (
                <div
                  key={g.id}
                  className="card"
                  style={{
                    minWidth: 220,
                    padding: 16,
                    background: `linear-gradient(160deg, ${g.color}14, #fff)`,
                  }}
                >
                  <div className="row" style={{ gap: 8 }}>
                    <span style={{ fontSize: 24 }}>{g.emoji}</span>
                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{ fontWeight: 800, fontSize: 14.5 }}>{g.name}</div>
                      <div className="muted" style={{ fontSize: 11.5 }}>
                        지금 {g.activeToday}명 활동 중
                      </div>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{
                      gap: 7,
                      marginTop: 12,
                      fontSize: 12.5,
                      color: 'var(--ink-2)',
                      background: 'var(--surface-2)',
                      borderRadius: 10,
                      padding: '9px 11px',
                    }}
                  >
                    <IconChat />
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {g.lastMessage}
                    </span>
                  </div>
                  <button
                    className="btn btn--block"
                    style={{ marginTop: 12, padding: '11px', fontSize: 13.5 }}
                    onClick={() => toast(`'${g.name}' 대화방은 준비 중이에요 💬`)}
                  >
                    입장하기
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 탐색 */}
        <div className="sec">
          <span className="sec__title">그룹 둘러보기</span>
        </div>
        <div className="row" style={{ gap: 8, marginBottom: 14 }}>
          {(['전체', '오픈', '지정'] as Filter[]).map((f) => (
            <button
              key={f}
              className={filter === f ? 'chip is-active' : 'chip'}
              onClick={() => setFilter(f)}
            >
              {f === '오픈' ? '오픈 그룹' : f === '지정' ? '지정 그룹' : '전체'}
            </button>
          ))}
        </div>

        <div className="stack" style={{ gap: 12 }}>
          {list.map((g) => (
            <GroupRow
              key={g.id}
              g={g}
              joined={state.joinedGroups.includes(g.id)}
              onToggle={() => {
                const wasIn = state.joinedGroups.includes(g.id)
                toggleGroup(g.id)
                toast(wasIn ? '그룹에서 나왔어요' : `'${g.name}' 가입 완료 🎉`)
              }}
            />
          ))}
        </div>

        {/* 새 그룹 만들기 */}
        <button
          className="btn btn--ghost btn--block"
          style={{ marginTop: 18 }}
          onClick={() => toast('그룹 만들기 · 준비 중 ✨')}
        >
          <IconSpark /> 새로운 그룹 만들기
        </button>
      </div>
    </div>
  )
}

function GroupRow({
  g,
  joined,
  onToggle,
}: {
  g: Community
  joined: boolean
  onToggle: () => void
}) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `${g.color}18`,
            display: 'grid',
            placeItems: 'center',
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {g.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 6 }}>
            <span
              className="chip"
              style={{
                padding: '3px 9px',
                fontSize: 10.5,
                background: g.kind === '지정' ? 'var(--accent-soft)' : 'var(--surface-2)',
                color: g.kind === '지정' ? 'var(--accent-ink)' : 'var(--ink-2)',
                borderColor: 'transparent',
              }}
            >
              {g.kind} 그룹
            </span>
            <span className="muted" style={{ fontSize: 11.5 }}>
              멤버 {fmt(g.members)}
            </span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 15.5, marginTop: 6 }}>{g.name}</div>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 2 }}>
            {g.desc}
          </div>
        </div>
      </div>
      <button
        className={joined ? 'btn btn--ghost btn--block' : 'btn btn--block'}
        style={{ marginTop: 14, padding: '11px', fontSize: 13.5, ...(joined ? { color: 'var(--ink-2)' } : {}) }}
        onClick={onToggle}
      >
        {joined ? '가입됨 · 나가기' : '가입하기'}
      </button>
    </div>
  )
}
