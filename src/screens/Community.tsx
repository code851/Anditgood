import { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store'
import {
  COMMUNITIES,
  CHALLENGES,
  ROOM_SEED,
  ROOM_CAPACITY,
  type Community,
  type ChatMessage,
} from '../data/content'
import { useToast } from '../components/ui'
import { IconPeople, IconChat, IconSpark, IconCheck } from '../components/icons'

type Filter = '전체' | '오픈' | '지정'

function localDate(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

export default function CommunityScreen() {
  const { state, toggleGroup } = useStore()
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('전체')
  const [roomId, setRoomId] = useState<string | null>(null)

  const activeRoom = roomId ? COMMUNITIES.find((r) => r.id === roomId) : null
  if (activeRoom) return <ChatRoom room={activeRoom} onBack={() => setRoomId(null)} />

  const list = filter === '전체' ? COMMUNITIES : COMMUNITIES.filter((c) => c.kind === filter)
  const myRooms = COMMUNITIES.filter((c) => state.joinedGroups.includes(c.id))

  const count = (c: Community) => c.roster.length + (state.joinedGroups.includes(c.id) ? 1 : 0)

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">커뮤니티</div>
          <div className="appbar__sub">작은 방에서 함께 미션을 이어가요</div>
        </div>
        <div className="chip chip--accent">
          <IconPeople /> {myRooms.length}
        </div>
      </header>

      <div className="page">
        {/* 내 방 */}
        {myRooms.length > 0 && (
          <>
            <div className="sec">
              <span className="sec__title">내 방</span>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              {myRooms.map((g) => {
                const ch = CHALLENGES.find((c) => c.id === g.challengeId)
                const seed = ROOM_SEED[g.id] ?? []
                const mine = state.roomMsgs[g.id] ?? []
                const all = [...seed, ...mine]
                const last = all[all.length - 1]
                return (
                  <button
                    key={g.id}
                    className="card"
                    onClick={() => setRoomId(g.id)}
                    style={{ padding: 14, textAlign: 'left', display: 'flex', gap: 12, alignItems: 'center' }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 15,
                        background: `${g.color}1e`,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 23,
                        flexShrink: 0,
                      }}
                    >
                      {g.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="row" style={{ gap: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: 14.5 }}>{g.name}</span>
                        <span className="muted" style={{ fontSize: 11.5 }}>
                          {count(g)}/{ROOM_CAPACITY}
                        </span>
                      </div>
                      <div
                        className="muted"
                        style={{
                          fontSize: 12.5,
                          marginTop: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {last
                          ? last.kind === 'mission'
                            ? `🔥 ${last.author}님 미션 완료`
                            : `${last.author}: ${last.text}`
                          : (ch ? `#${ch.tag} 함께하기` : '')}
                      </div>
                    </div>
                    <IconChat />
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* 방 둘러보기 */}
        <div className="sec">
          <span className="sec__title">방 둘러보기</span>
          <span className="sec__more">챌린지별로 골라 참여</span>
        </div>
        <div className="row" style={{ gap: 8, marginBottom: 14 }}>
          {(['전체', '오픈', '지정'] as Filter[]).map((f) => (
            <button key={f} className={filter === f ? 'chip is-active' : 'chip'} onClick={() => setFilter(f)}>
              {f === '오픈' ? '오픈방' : f === '지정' ? '지정방' : '전체'}
            </button>
          ))}
        </div>

        <div className="stack" style={{ gap: 12 }}>
          {list.map((g) => {
            const ch = CHALLENGES.find((c) => c.id === g.challengeId)
            const joined = state.joinedGroups.includes(g.id)
            const full = g.roster.length >= ROOM_CAPACITY && !joined
            return (
              <div key={g.id} className="card" style={{ padding: 16 }}>
                <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 15,
                      background: `${g.color}1e`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    {g.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
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
                        {g.kind}방
                      </span>
                      {ch && (
                        <span className="chip" style={{ padding: '3px 9px', fontSize: 10.5 }}>
                          {ch.emoji} {ch.title}
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 15.5, marginTop: 6 }}>{g.name}</div>
                    <div className="muted" style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>
                      {g.desc}
                    </div>
                    {/* 참여자 아바타 */}
                    <div className="row" style={{ gap: 4, marginTop: 8 }}>
                      {g.roster.slice(0, ROOM_CAPACITY).map((m, i) => (
                        <span
                          key={i}
                          title={m.name}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: 'var(--surface-2)',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 13,
                            border: '1px solid var(--line)',
                          }}
                        >
                          {m.avatar}
                        </span>
                      ))}
                      <span className="muted" style={{ fontSize: 11.5, marginLeft: 4 }}>
                        {g.roster.length + (joined ? 1 : 0)}/{ROOM_CAPACITY}명
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ gap: 8, marginTop: 14 }}>
                  {joined ? (
                    <>
                      <button
                        className="btn btn--accent"
                        style={{ flex: 1, padding: '11px', fontSize: 13.5 }}
                        onClick={() => setRoomId(g.id)}
                      >
                        <IconChat /> 입장하기
                      </button>
                      <button
                        className="btn btn--ghost"
                        style={{ padding: '11px 14px', fontSize: 13, color: 'var(--ink-2)' }}
                        onClick={() => {
                          toggleGroup(g.id)
                          toast('방에서 나왔어요')
                        }}
                      >
                        나가기
                      </button>
                    </>
                  ) : (
                    <button
                      className={full ? 'btn btn--ghost btn--block' : 'btn btn--block'}
                      style={{ padding: '11px', fontSize: 13.5, ...(full ? { color: 'var(--ink-3)' } : {}) }}
                      disabled={full}
                      onClick={() => {
                        toggleGroup(g.id)
                        toast(`'${g.name}' 참여 완료 🎉`)
                      }}
                    >
                      {full ? `정원 마감 (${ROOM_CAPACITY}/${ROOM_CAPACITY})` : '이 방 참여하기'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          className="btn btn--ghost btn--block"
          style={{ marginTop: 18 }}
          onClick={() => toast('내 방 만들기 · 준비 중 ✨')}
        >
          <IconSpark /> 내 방 만들기
        </button>
      </div>
    </div>
  )
}

// ── 채팅방 ──
function ChatRoom({ room, onBack }: { room: Community; onBack: () => void }) {
  const { state, checkInChallenge, sendChat } = useStore()
  const toast = useToast()
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const messages = useMemo<ChatMessage[]>(() => {
    const seed = ROOM_SEED[room.id] ?? []
    const mine = state.roomMsgs[room.id] ?? []
    return [...seed, ...mine].sort((a, b) => a.date.localeCompare(b.date))
  }, [room.id, state.roomMsgs])

  const ch = CHALLENGES.find((c) => c.id === room.challengeId)
  const joinedChallenge = state.joined.find((j) => j.challengeId === room.challengeId)
  const checkedToday = joinedChallenge?.lastCheck === localDate()
  const memberCount = room.roster.length + 1 // 나 포함

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages.length])

  function send() {
    const t = text.trim()
    if (!t) return
    sendChat(room.id, t)
    setText('')
  }

  function certifyHere() {
    if (!ch || checkedToday) return
    const res = checkInChallenge(room.challengeId)
    toast(res.completed ? '🎉 완주! 챌린지 탭에서 나눔을 전해요' : '오늘 미션 완료 🔥 방에 공유됐어요')
  }

  return (
    <div
      className="scroll"
      style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--tab-h)' }}
    >
      {/* 헤더 */}
      <header className="appbar" style={{ gap: 10, alignItems: 'center' }}>
        <button onClick={onBack} aria-label="뒤로" style={{ fontSize: 22, lineHeight: 1, color: 'var(--ink)' }}>
          ‹
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 6 }}>
            <span className="appbar__title" style={{ fontSize: 17 }}>
              {room.emoji} {room.name}
            </span>
          </div>
          <div className="appbar__sub">
            {ch ? `#${ch.tag} · ` : ''}
            {memberCount}/{ROOM_CAPACITY}명 · {room.kind}방
          </div>
        </div>
        <div className="row">
          {[{ name: '나', avatar: '🙂' }, ...room.roster].slice(0, 4).map((m, i) => (
            <span
              key={i}
              title={m.name}
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'var(--surface)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 13,
                border: '1.5px solid var(--bg)',
                marginLeft: i ? -8 : 0,
              }}
            >
              {m.avatar}
            </span>
          ))}
        </div>
      </header>

      {/* 메시지 */}
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 12px', background: 'var(--bg)' }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 11.5,
            color: 'var(--ink-3)',
            margin: '8px 0 14px',
          }}
        >
          최대 {ROOM_CAPACITY}명의 작은 방이에요. 서로의 미션 완료가 여기에 떠요.
        </div>
        {messages.map((m) =>
          m.kind === 'mission' ? (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
              <div
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--accent-ink)',
                  fontSize: 12.5,
                  fontWeight: 700,
                  padding: '8px 14px',
                  borderRadius: 999,
                  maxWidth: '85%',
                  textAlign: 'center',
                  lineHeight: 1.45,
                }}
              >
                🔥 {m.mine ? '내가' : `${m.author}님이`} 「{m.text}」 오늘 미션 완료!
              </div>
            </div>
          ) : m.mine ? (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <div
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '16px 16px 4px 16px',
                  fontSize: 14,
                  lineHeight: 1.5,
                  maxWidth: '76%',
                }}
              >
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-end' }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'var(--surface)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 15,
                  border: '1px solid var(--line)',
                  flexShrink: 0,
                }}
              >
                {m.avatar}
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="muted" style={{ fontSize: 11, marginBottom: 3, marginLeft: 2 }}>
                  {m.author}
                </div>
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    padding: '10px 14px',
                    borderRadius: '16px 16px 16px 4px',
                    fontSize: 14,
                    lineHeight: 1.5,
                    maxWidth: '100%',
                  }}
                >
                  {m.text}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* 미션 인증 바 */}
      {ch && (
        <div style={{ padding: '8px 12px 0', background: 'var(--bg)' }}>
          {joinedChallenge ? (
            <button
              className={checkedToday ? 'btn btn--ghost btn--block' : 'btn btn--accent btn--block'}
              disabled={checkedToday}
              onClick={certifyHere}
              style={{ padding: '11px', fontSize: 13.5, ...(checkedToday ? { color: 'var(--sage)' } : {}) }}
            >
              {checkedToday ? (
                <>
                  <IconCheck /> 오늘 미션 완료됨
                </>
              ) : (
                <>
                  <IconCheck /> 「{ch.title}」 오늘 미션 인증하고 방에 공유
                </>
              )}
            </button>
          ) : (
            <div
              className="muted"
              style={{ fontSize: 12, textAlign: 'center', padding: '6px 0', lineHeight: 1.5 }}
            >
              챌린지 탭에서 「{ch.title}」에 참여하면 여기서 미션을 인증할 수 있어요
            </div>
          )}
        </div>
      )}

      {/* 입력 */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '10px 12px calc(10px + env(safe-area-inset-bottom))',
          background: 'var(--bg)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="메시지 보내기"
          style={{
            flex: 1,
            padding: '12px 15px',
            borderRadius: 999,
            border: '1.6px solid var(--line-strong)',
            background: 'var(--surface)',
            fontSize: 14.5,
            outline: 'none',
            color: 'var(--ink)',
          }}
        />
        <button
          className="btn btn--accent"
          onClick={send}
          disabled={!text.trim()}
          style={{ padding: '0 18px', fontSize: 14 }}
        >
          전송
        </button>
      </div>
    </div>
  )
}
