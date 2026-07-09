import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

// ── 토스트 ──
const ToastCtx = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((m: string) => {
    setMsg(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 1900)
  }, [])

  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}

// ── 바텀시트 ──
export function Sheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 80,
        background: 'rgba(30,22,16,0.42)',
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'fadeUp 0.2s ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--surface)',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: '10px 20px calc(24px + env(safe-area-inset-bottom))',
          maxHeight: '88%',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          animation: 'sheetUp 0.28s cubic-bezier(.2,.8,.2,1) both',
        }}
      >
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 3,
            background: 'var(--line-strong)',
            margin: '8px auto 14px',
          }}
        />
        {title && (
          <h3 style={{ margin: '0 0 14px', fontSize: 19, fontWeight: 800 }}>{title}</h3>
        )}
        {children}
      </div>
      <style>{`@keyframes sheetUp{from{transform:translateY(30px);opacity:.4}to{transform:none;opacity:1}}`}</style>
    </div>
  )
}

export function fmt(n: number): string {
  return n.toLocaleString('ko-KR')
}

export function ProgressBar({ value, color }: { value: number; color?: string }) {
  return (
    <div
      style={{
        height: 8,
        borderRadius: 6,
        background: 'var(--surface-sunken)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: '100%',
          borderRadius: 6,
          background: color ?? 'var(--accent)',
          transition: 'width 0.5s cubic-bezier(.2,.8,.2,1)',
        }}
      />
    </div>
  )
}
