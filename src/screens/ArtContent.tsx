import { useState } from 'react'
import { useStore } from '../store'
import { FEED, type ContentCategory, type FeedPost } from '../data/content'
import { fmt, useToast } from '../components/ui'
import { IconHeart, IconBookmark, IconChat, IconPlus } from '../components/icons'

const CATS: ContentCategory[] = ['전체', '작품', '상식', '전시·정보', '뉴스', '저자극']

export default function ArtContent() {
  const { state, toggleLike, toggleSave } = useStore()
  const toast = useToast()
  const [cat, setCat] = useState<ContentCategory>('전체')
  const [onlySaved, setOnlySaved] = useState(false)

  let posts = FEED
  if (cat !== '전체') posts = posts.filter((p) => p.category === cat)
  if (onlySaved) posts = posts.filter((p) => state.savedPosts.includes(p.id))

  return (
    <div className="scroll">
      <header className="appbar">
        <div>
          <div className="appbar__title">예술 콘텐츠</div>
          <div className="appbar__sub">오늘의 예술, 스크롤로 만나요</div>
        </div>
        <button
          className={onlySaved ? 'chip is-active' : 'chip'}
          onClick={() => setOnlySaved((v) => !v)}
        >
          <IconBookmark fill={onlySaved} /> 저장함
        </button>
      </header>

      <div className="hscroll" style={{ paddingBottom: 6 }}>
        {CATS.map((c) => (
          <button
            key={c}
            className={cat === c ? 'chip is-active' : 'chip'}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="page--flush" style={{ paddingTop: 6 }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--ink-3)', padding: '60px 20px' }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>🔖</div>
            <div style={{ fontWeight: 700, color: 'var(--ink-2)' }}>
              {onlySaved ? '저장한 게시물이 없어요' : '해당 카테고리 게시물이 없어요'}
            </div>
          </div>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              liked={state.likedPosts.includes(p.id)}
              saved={state.savedPosts.includes(p.id)}
              onLike={() => toggleLike(p.id)}
              onSave={() => {
                toggleSave(p.id)
                if (!state.savedPosts.includes(p.id)) toast('저장함에 담았어요 🔖')
              }}
              onComment={() => toast('댓글 기능은 준비 중이에요 💬')}
            />
          ))
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
    </div>
  )
}

function PostCard({
  post,
  liked,
  saved,
  onLike,
  onSave,
  onComment,
}: {
  post: FeedPost
  liked: boolean
  saved: boolean
  onLike: () => void
  onSave: () => void
  onComment: () => void
}) {
  return (
    <article style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
      {/* 헤더 */}
      <div className="row" style={{ gap: 10, padding: '12px 16px' }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'var(--surface-2)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 20,
            border: '1px solid var(--line)',
          }}
        >
          {post.avatar}
        </div>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{post.author}</div>
          <div className="muted" style={{ fontSize: 11.5 }}>{post.handle}</div>
        </div>
        <span className="chip" style={{ padding: '4px 10px', fontSize: 11 }}>
          {post.category}
        </span>
      </div>

      {/* 이미지 영역 */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          background: post.gradient,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: 96, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.25))' }}>
          {post.emoji}
        </span>
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
        <span
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(255,255,255,.9)',
            color: 'var(--ink)',
            fontSize: 11.5,
            fontWeight: 800,
            padding: '5px 11px',
            borderRadius: 999,
          }}
        >
          {post.title}
        </span>
      </div>

      {/* 액션 */}
      <div className="row" style={{ gap: 18, padding: '11px 16px 4px', color: 'var(--ink)' }}>
        <button onClick={onLike} className="row" style={{ gap: 5, color: liked ? 'var(--accent)' : 'var(--ink)' }}>
          <IconHeart fill={liked} />
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{fmt(post.likes + (liked ? 1 : 0))}</span>
        </button>
        <button onClick={onComment} className="row" style={{ gap: 5 }}>
          <IconChat />
        </button>
        <button
          onClick={onSave}
          style={{ marginLeft: 'auto', color: saved ? 'var(--accent)' : 'var(--ink)' }}
        >
          <IconBookmark fill={saved} />
        </button>
      </div>

      {/* 본문 */}
      <div style={{ padding: '2px 16px 16px' }}>
        <p style={{ margin: '4px 0 8px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)' }}>
          <b>{post.title}</b> — {post.body}
        </p>
        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          {post.tags.map((t) => (
            <span key={t} style={{ fontSize: 12.5, color: 'var(--accent-ink)', fontWeight: 600 }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
