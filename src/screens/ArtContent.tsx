import { useRef, useState } from 'react'
import { useStore } from '../store'
import {
  FEED,
  CATEGORY_GRADIENT,
  type ContentCategory,
  type FeedPost,
} from '../data/content'
import { Sheet, fmt, useToast } from '../components/ui'
import { IconHeart, IconBookmark, IconChat, IconPlus } from '../components/icons'

const CATS: ContentCategory[] = ['전체', '작품', '상식', '전시·정보', '뉴스', '저자극']
const POST_CATS = CATS.filter((c) => c !== '전체') as Exclude<ContentCategory, '전체'>[]
const EMOJIS = ['🎨', '🖼️', '✏️', '🖌️', '📷', '🌻', '🌙', '🪷', '🏛️', '🎭', '📖', '🎧']

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
  const { state, toggleLike, toggleSave, addUserPost, deleteUserPost } = useStore()
  const toast = useToast()
  const [cat, setCat] = useState<ContentCategory>('전체')
  const [onlySaved, setOnlySaved] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [composeOpen, setComposeOpen] = useState(false)

  const allPosts = [...state.userPosts, ...FEED]
  let posts = allPosts
  if (cat !== '전체') posts = posts.filter((p) => p.category === cat)
  if (onlySaved) posts = posts.filter((p) => state.savedPosts.includes(p.id))

  const active = activeId ? allPosts.find((p) => p.id === activeId) : null

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
                  background: p.image ? `center/cover no-repeat url(${p.image})` : p.gradient,
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                }}
              >
                {!p.image && (
                  <span style={{ fontSize: 40, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.28))' }}>{p.emoji}</span>
                )}

                <span style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 4, alignItems: 'center' }}>
                  {p.mine && (
                    <span
                      style={{
                        background: 'rgba(0,0,0,.42)',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: 6,
                      }}
                    >
                      내 글
                    </span>
                  )}
                  {state.savedPosts.includes(p.id) && (
                    <span style={{ color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
                      <IconBookmark fill />
                    </span>
                  )}
                  {p.media === 'reel' && <ReelIcon />}
                  {p.media === 'carousel' && <CarouselIcon />}
                </span>

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
        onClick={() => setComposeOpen(true)}
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
          onDelete={
            active.mine
              ? () => {
                  deleteUserPost(active.id)
                  setActiveId(null)
                  toast('게시물을 삭제했어요')
                }
              : undefined
          }
          onClose={() => setActiveId(null)}
        />
      )}

      {/* 업로드 작성 */}
      <ComposeSheet
        open={composeOpen}
        authorName={state.name || '나'}
        onClose={() => setComposeOpen(false)}
        onSubmit={(post) => {
          addUserPost(post)
          setComposeOpen(false)
          setCat('전체')
          setActiveId(post.id)
          toast('게시물을 올렸어요 🎉')
        }}
      />
    </div>
  )
}

function ComposeSheet({
  open,
  authorName,
  onClose,
  onSubmit,
}: {
  open: boolean
  authorName: string
  onClose: () => void
  onSubmit: (post: FeedPost) => void
}) {
  const [image, setImage] = useState<string | null>(null)
  const [emoji, setEmoji] = useState('🎨')
  const [category, setCategory] = useState<Exclude<ContentCategory, '전체'>>('작품')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function reset() {
    setImage(null)
    setEmoji('🎨')
    setCategory('작품')
    setTitle('')
    setBody('')
    setTags('')
  }

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setImage(String(reader.result))
    reader.readAsDataURL(f)
  }

  function submit() {
    if (!title.trim()) return
    const id = `p_${Date.now().toString(36)}_${Math.floor(Math.random() * 1e4)}`
    const post: FeedPost = {
      id,
      author: authorName,
      handle: `@${authorName}`,
      avatar: '🙂',
      category,
      gradient: CATEGORY_GRADIENT[category],
      emoji,
      title: title.trim(),
      body: body.trim() || '오늘의 예술 한 조각을 남겼어요.',
      tags: tags
        .split(/[,#\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 4),
      likes: 0,
      saves: 0,
      mine: true,
      image: image ?? undefined,
    }
    onSubmit(post)
    reset()
  }

  return (
    <Sheet open={open} onClose={onClose} title="새 게시물">
      {/* 이미지/썸네일 */}
      <div
        onClick={() => fileRef.current?.click()}
        style={{
          aspectRatio: '16 / 10',
          borderRadius: 16,
          background: image ? `center/cover no-repeat url(${image})` : CATEGORY_GRADIENT[category],
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          marginBottom: 14,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {!image && <span style={{ fontSize: 54, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.3))' }}>{emoji}</span>}
        <span
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: 'rgba(0,0,0,.5)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            padding: '6px 12px',
            borderRadius: 999,
            backdropFilter: 'blur(4px)',
          }}
        >
          📷 {image ? '사진 변경' : '사진 올리기'}
        </span>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} style={{ display: 'none' }} />

      {/* 이미지 없을 때 이모지 선택 */}
      {!image && (
        <>
          <div className="cLabel">대표 이모지</div>
          <div className="hscroll" style={{ margin: '0 0 14px', padding: 0 }}>
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                style={{
                  fontSize: 22,
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: emoji === e ? 'var(--accent-soft)' : 'var(--surface-2)',
                  border: emoji === e ? '2px solid var(--accent)' : '1px solid var(--line)',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 카테고리 */}
      <div className="cLabel">카테고리</div>
      <div className="row" style={{ gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
        {POST_CATS.map((c) => (
          <button key={c} className={category === c ? 'chip is-active' : 'chip'} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* 제목 */}
      <div className="cLabel">제목</div>
      <input
        className="cInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="예: 오늘 마주친 골목의 벽화"
        maxLength={40}
      />

      {/* 본문 */}
      <div className="cLabel" style={{ marginTop: 14 }}>내용</div>
      <textarea
        className="cInput"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{ resize: 'none' }}
        placeholder="느낀 점이나 이야기를 자유롭게 적어보세요."
        maxLength={280}
      />

      {/* 태그 */}
      <div className="cLabel" style={{ marginTop: 14 }}>태그</div>
      <input
        className="cInput"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="쉼표로 구분 · 예: 벽화, 산책"
        maxLength={40}
      />

      <button className="btn btn--accent btn--block" style={{ marginTop: 20 }} disabled={!title.trim()} onClick={submit}>
        게시하기
      </button>

      <style>{`
        .cLabel{font-size:13px;font-weight:700;color:var(--ink-2);margin-bottom:8px;}
        .cInput{width:100%;padding:13px 15px;border-radius:13px;border:1.6px solid var(--line-strong);
          background:var(--surface);font-size:15px;color:var(--ink);outline:none;transition:border-color .15s;}
        .cInput:focus{border-color:var(--accent);}
        .cInput::placeholder{color:var(--ink-3);}
      `}</style>
    </Sheet>
  )
}

function PostDetail({
  post,
  liked,
  saved,
  onLike,
  onSave,
  onComment,
  onDelete,
  onClose,
}: {
  post: FeedPost
  liked: boolean
  saved: boolean
  onLike: () => void
  onSave: () => void
  onComment: () => void
  onDelete?: () => void
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
        <div className="appbar__title" style={{ fontSize: 17, flex: 1 }}>
          게시물
        </div>
        {onDelete && (
          <button onClick={onDelete} style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)' }}>
            삭제
          </button>
        )}
      </header>

      <div style={{ flex: 1, overflowY: 'auto' }}>
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
          {post.image ? (
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 108, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.25))' }}>{post.emoji}</span>
          )}
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
