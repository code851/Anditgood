import { useState } from 'react'
import { useStore } from '../store'
import { FEED, type ContentCategory, type FeedPost } from '../data/content'
import { fmt, useToast } from '../components/ui'
import { IconHeart, IconBookmark, IconChat, IconPlus } from '../components/icons'

const CATS: ContentCategory[] = ['전체', '작품', '상식', '전시·정보', '뉴스', '저자극']

// 탐색 그리드 아이콘
const ReelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
    <path d="M8 5v14l11-7z" />
  </svg>
)
const CarouselIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
    <rect x="8" y="4" width="12" height="12" rx="2" />
    <path d="M4 8v10a2 2 0 0 0 2 2h10" />
  </svg>
)

export default function ArtContent() {
  const { state, toggleLike, toggleSave } = useStore()
  const toast = useToast()
  const [cat, setCat] = useState<ContentCategory>('전체')
  const [onlySaved, setOnlySaved] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  let posts = FEED
  if (cat !== '전체') posts = posts.filter((p) => p.category === cat)
  if (onlySaved) posts = posts.filter((p) => state.savedPosts.includes(p.id))

  const active = activeId ? FEED.find((p) => p.id === activeId) : null

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">예술 콘텐츠</div>
          <div className="appbar__sub">오늘의 예술, 탐색해보세요</div>
        </div>
        <button className={onlySaved ? 'chip is-active' : 'chip'} onClick={() => setOnlySaved((v) => !v)}>
          <IconBookmark fill={onlySaved} /> 저장함
        </button>
      </header>

      <div className="hscroll" style={{ paddingBottom: 8 }}>
        {CATS.map((c) => (
          <button key={c} className={cat === c ? 'chip is-active' : 'chip'} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="page--flush" style={{ paddingTop: 4 }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--ink-3)', padding: '60px 20px' }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>🔖</div>
            <div style={{ fontWeight: 700, color: 'var(--ink-2)' }}>
              {onlySaved ? '저장한 게시물이 없어요' : '해당 카테고리 게시물이 없어요'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
            {posts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  background: p.gradient,
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: 40, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.28))' }}>{p.emoji}</span>

                {/* 우상단 미디어 아이콘 */}
                {(p.media || state.savedPosts.includes(p.id)) && (
                  <span style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4 }}>
                    {state.savedPosts.includes(p.id) && (
                      <span style={{ color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
                        <IconBookmark fill />
                      </span>
                    )}
                    {p.media === 'reel' && <ReelIcon />}
                    {p.media === 'carousel' && <CarouselIcon />}
                  </span>
                )}

                {/* 광고 배지 */}
                {p.sponsored && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      background: 'rgba(0,0,0,.42)',
                      color: '#fff',
                      fontSize: 9.5,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 6,
                    }}
                  >
                    광고
                  </span>
                )}

                {/* 하단 제목 */}
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '18px 8px 7px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,.55))',
                    color: '#fff',
                    fontSize: 10.5,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 업로드 FAB */}
      <button
        onClick={() => toast('내 작업물 업로드 · 준비 중 ✍️')}
        aria-label="게시물 올리기"
        style={{
          position: 'absolute',
          right: 18,
          bottom: 'calc(var(--tab-h) + 18px)',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          boxShadow: 'var(--shadow-md)',
          zIndex: 25,
        }}
      >
        <IconPlus />
      </button>

      {/* 게시물 상세 */}
      {active && (
        <PostDetail
          post={active}
          liked={state.likedPosts.includes(active.id)}
          saved={state.savedPosts.includes(active.id)}
          onLike={() => toggleLike(active.id)}
          onSave={() => {
            toggleSave(active.id)
            if (!state.savedPosts.includes(active.id)) toast('저장함에 담았어요 🔖')
          }}
          onComment={() => toast('댓글 기능은 준비 중이에요 💬')}
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  )
}

function PostDetail({
  post,
  liked,
  saved,
  onLike,
  onSave,
  onComment,
  onClose,
}: {
  post: FeedPost
  liked: boolean
  saved: boolean
  onLike: () => void
  onSave: () => void
  onComment: () => void
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 70,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeUp 0.22s ease both',
      }}
    >
      <header className="appbar" style={{ gap: 10, alignItems: 'center' }}>
        <button onClick={onClose} aria-label="뒤로" style={{ fontSize: 24, lineHeight: 1, color: 'var(--ink)' }}>
          ‹
        </button>
        <div className="appbar__title" style={{ fontSize: 17 }}>
          게시물
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* 작성자 */}
        <div className="row" style={{ gap: 10, padding: '10px 16px' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--surface-2)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 21,
              border: '1px solid var(--line)',
            }}
          >
            {post.avatar}
          </div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{post.author}</div>
            <div className="muted" style={{ fontSize: 11.5 }}>{post.handle}</div>
          </div>
          <span className="chip" style={{ padding: '4px 10px', fontSize: 11 }}>{post.category}</span>
        </div>

        {/* 이미지 */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 5',
            background: post.gradient,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <span style={{ fontSize: 108, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.25))' }}>{post.emoji}</span>
          {post.sponsored && (
            <span
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: 'rgba(0,0,0,.42)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 9px',
                borderRadius: 999,
                backdropFilter: 'blur(4px)',
              }}
            >
              선별 광고 · AD
            </span>
          )}
        </div>

        {/* 액션 */}
        <div className="row" style={{ gap: 18, padding: '12px 16px 4px', color: 'var(--ink)' }}>
          <button onClick={onLike} className="row" style={{ gap: 5, color: liked ? 'var(--accent)' : 'var(--ink)' }}>
            <IconHeart fill={liked} />
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{fmt(post.likes + (liked ? 1 : 0))}</span>
          </button>
          <button onClick={onComment} className="row" style={{ gap: 5 }}>
            <IconChat />
          </button>
          <button onClick={onSave} style={{ marginLeft: 'auto', color: saved ? 'var(--accent)' : 'var(--ink)' }}>
            <IconBookmark fill={saved} />
          </button>
        </div>

        {/* 본문 */}
        <div style={{ padding: '4px 16px 32px' }}>
          <p style={{ margin: '4px 0 10px', fontSize: 15, lineHeight: 1.7, color: 'var(--ink)' }}>
            <b>{post.title}</b> — {post.body}
          </p>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {post.tags.map((t) => (
              <span key={t} style={{ fontSize: 13, color: 'var(--accent-ink)', fontWeight: 600 }}>
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
