import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ArtTypeId } from './data/artTypes'
import { CHALLENGES, COMMUNITIES, DONATION_TARGETS, type ChatMessage, type FeedPost } from './data/content'
import { applyTheme } from './data/themes'

const KEY = 'anditgood.v1'

export interface ArchiveEntry {
  id: string
  challengeId?: string
  text: string
  mood?: string
  date: string // ISO
}

export interface JoinedChallenge {
  challengeId: string
  progress: number // 완료한 일수
  lastCheck?: string // 마지막 인증 날짜 (YYYY-MM-DD)
  stake: number // 이 챌린지에 투자한 가치의 양
  done?: boolean // 완주 + 기부까지 마쳤는지
}

// 완주로 발급되는 기부증서
export interface Certificate {
  id: string
  serial: string
  challengeId: string
  challengeTitle: string
  amount: number // 기부된 양
  beneficiaryName: string
  beneficiaryGroup: string
  beneficiaryEmoji: string
  message?: string // 대상에게 남긴 한 마디
  date: string // ISO
}

export interface AppState {
  onboarded: boolean
  type: ArtTypeId | null
  name: string
  bio: string
  goal: string
  seeds: number // 투자용 열매 잔액
  streak: number
  badges: string[]
  joined: JoinedChallenge[]
  archive: ArchiveEntry[]
  certificates: Certificate[]
  savedPosts: string[]
  likedPosts: string[]
  userPosts: FeedPost[] // 내가 올린 게시물
  joinedGroups: string[]
  roomMsgs: Record<string, ChatMessage[]> // 방별로 추가된 메시지(내 대화·내 미션 알림)
  themeId: string
  customColor?: string
  equippedItem: string | null // 캐릭터에 장착한 아이템
  currencyLabel: string // 투자 단위 단어 (열매/경험/가치/영감 …)
}

const initialState: AppState = {
  onboarded: false,
  type: null,
  name: '',
  bio: '',
  goal: '',
  seeds: 30,
  streak: 0,
  badges: [],
  joined: [],
  archive: [],
  certificates: [],
  savedPosts: [],
  likedPosts: [],
  userPosts: [],
  joinedGroups: ['g1'],
  roomMsgs: {},
  themeId: 'apricot',
  equippedItem: null,
  currencyLabel: '열매',
}

// 캐릭터가 완전히 색을 되찾는 데 필요한 누적 인증 수
export const GROWTH_CAP = 20

export function totalCheckIns(joined: JoinedChallenge[]): number {
  return joined.reduce((sum, j) => sum + j.progress, 0)
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initialState, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return initialState
}

interface Store {
  state: AppState
  set: (patch: Partial<AppState>) => void
  completeOnboarding: (data: {
    type: ArtTypeId
    name: string
    bio: string
    goal: string
  }) => void
  joinChallenge: (id: string, amount: number) => void
  checkInChallenge: (id: string, note?: string) => { day: number; completed: boolean }
  finalizeDonation: (args: {
    challengeId: string
    targetId: string
    message: string
  }) => Certificate | null
  addArchive: (entry: Omit<ArchiveEntry, 'id' | 'date'>) => void
  toggleSave: (postId: string) => void
  toggleLike: (postId: string) => void
  toggleGroup: (groupId: string) => void
  addUserPost: (post: FeedPost) => void
  deleteUserPost: (id: string) => void
  sendChat: (roomId: string, text: string) => void
  setTheme: (themeId: string) => void
  setCustomColor: (hex: string) => void
  setEquippedItem: (id: string | null) => void
  setCurrencyLabel: (word: string) => void
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

function today(): string {
  // 로컬 날짜 (YYYY-MM-DD)
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`
}

let uid = 0
function makeId(): string {
  uid += 1
  return `${Date.now().toString(36)}-${uid}`
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // 저장 용량 초과(업로드 이미지 등) 시 조용히 무시 — 세션 내 상태는 유지됨
    }
  }, [state])

  // 선택한 컬러 테마를 앱 전역에 적용
  useEffect(() => {
    applyTheme(state.themeId, state.customColor)
  }, [state.themeId, state.customColor])

  const store = useMemo<Store>(() => {
    const set = (patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch }))

    return {
      state,
      set,

      completeOnboarding: ({ type, name, bio, goal }) =>
        setState((s) => ({
          ...s,
          onboarded: true,
          type,
          name,
          bio,
          goal,
          badges: s.badges.includes('b_start') ? s.badges : [...s.badges, 'b_start'],
        })),

      joinChallenge: (id, amount) =>
        setState((s) => {
          if (s.joined.some((j) => j.challengeId === id && !j.done)) return s
          const ch = CHALLENGES.find((c) => c.id === id)
          if (!ch) return s
          const amt = Math.max(1, Math.min(amount, s.seeds))
          if (s.seeds < amt) return s
          const others = s.joined.filter((j) => j.challengeId !== id)
          return {
            ...s,
            seeds: s.seeds - amt, // 투자 (완주 후 선택한 대상에게 기부로 전달)
            joined: [...others, { challengeId: id, progress: 0, stake: amt }],
          }
        }),

      // 매일의 미션 인증 (프로토타입: 하루 제한 없이 이어서 진행)
      checkInChallenge: (id, note) => {
        let result = { day: 0, completed: false }
        setState((s) => {
          const ch = CHALLENGES.find((c) => c.id === id)
          if (!ch) return s
          const t = today()
          const joined = s.joined.map((j) => {
            if (j.challengeId !== id || j.done) return j
            return { ...j, progress: Math.min(j.progress + 1, ch.totalDays), lastCheck: t }
          })
          const target = joined.find((j) => j.challengeId === id && !j.done)
          if (!target) return s
          result = { day: target.progress, completed: target.progress >= ch.totalDays }

          const newStreak = s.streak + 1
          let badges = s.badges
          if (newStreak >= 7 && !badges.includes('b_streak7')) badges = [...badges, 'b_streak7']

          const archive = note
            ? [{ id: makeId(), challengeId: id, text: note, date: new Date().toISOString() }, ...s.archive]
            : s.archive

          // 같은 챌린지 방에 오늘의 미션 수행 알림
          let roomMsgs = s.roomMsgs
          const rooms = COMMUNITIES.filter((r) => s.joinedGroups.includes(r.id) && r.challengeId === id)
          if (rooms.length) {
            roomMsgs = { ...s.roomMsgs }
            for (const r of rooms) {
              const notice: ChatMessage = {
                id: makeId(), kind: 'mission', author: s.name || '나', avatar: '🙂',
                text: ch.title, date: new Date().toISOString(), mine: true,
              }
              roomMsgs[r.id] = [...(roomMsgs[r.id] ?? []), notice]
            }
          }

          return { ...s, joined, badges, streak: newStreak, archive, roomMsgs }
        })
        return result
      },

      // 완주 후: 선택한 대상에게 기부 → 증서 발급 + 뱃지 추가 + 챌린지 완료 처리
      finalizeDonation: ({ challengeId, targetId, message }) => {
        let cert: Certificate | null = null
        setState((s) => {
          const ch = CHALLENGES.find((c) => c.id === challengeId)
          const tg = DONATION_TARGETS.find((t) => t.id === targetId)
          const j = s.joined.find((x) => x.challengeId === challengeId && !x.done)
          if (!ch || !tg || !j) return s

          cert = {
            id: makeId(),
            serial: `AG-${new Date().getFullYear()}-${String(s.certificates.length + 1).padStart(4, '0')}`,
            challengeId,
            challengeTitle: ch.title,
            amount: j.stake,
            beneficiaryName: tg.name,
            beneficiaryGroup: tg.group,
            beneficiaryEmoji: tg.emoji,
            message: message.trim() || undefined,
            date: new Date().toISOString(),
          }
          const certificates = [cert, ...s.certificates]

          let badges = s.badges
          if (!badges.includes(ch.badgeOnClear)) badges = [...badges, ch.badgeOnClear]
          if (!badges.includes('b_gift1')) badges = [...badges, 'b_gift1']
          if (certificates.length >= 3 && !badges.includes('b_gift3')) badges = [...badges, 'b_gift3']

          const joined = s.joined.map((x) =>
            x.challengeId === challengeId && !x.done ? { ...x, done: true } : x,
          )
          return { ...s, certificates, badges, joined }
        })
        return cert
      },

      addArchive: (entry) =>
        setState((s) => ({
          ...s,
          archive: [
            { ...entry, id: makeId(), date: new Date().toISOString() },
            ...s.archive,
          ],
        })),

      toggleSave: (postId) =>
        setState((s) => ({
          ...s,
          savedPosts: s.savedPosts.includes(postId)
            ? s.savedPosts.filter((p) => p !== postId)
            : [...s.savedPosts, postId],
        })),

      toggleLike: (postId) =>
        setState((s) => ({
          ...s,
          likedPosts: s.likedPosts.includes(postId)
            ? s.likedPosts.filter((p) => p !== postId)
            : [...s.likedPosts, postId],
        })),

      toggleGroup: (groupId) =>
        setState((s) => ({
          ...s,
          joinedGroups: s.joinedGroups.includes(groupId)
            ? s.joinedGroups.filter((g) => g !== groupId)
            : [...s.joinedGroups, groupId],
        })),

      addUserPost: (post) => setState((s) => ({ ...s, userPosts: [post, ...s.userPosts] })),

      deleteUserPost: (id) =>
        setState((s) => ({ ...s, userPosts: s.userPosts.filter((p) => p.id !== id) })),

      sendChat: (roomId, text) =>
        setState((s) => {
          const msg: ChatMessage = {
            id: makeId(),
            kind: 'chat',
            author: s.name || '나',
            avatar: '🙂',
            text,
            date: new Date().toISOString(),
            mine: true,
          }
          return {
            ...s,
            roomMsgs: { ...s.roomMsgs, [roomId]: [...(s.roomMsgs[roomId] ?? []), msg] },
          }
        }),

      setTheme: (themeId) => setState((s) => ({ ...s, themeId })),

      setCustomColor: (hex) => setState((s) => ({ ...s, themeId: 'custom', customColor: hex })),

      setEquippedItem: (id) =>
        setState((s) => ({ ...s, equippedItem: s.equippedItem === id ? null : id })),

      setCurrencyLabel: (word) => setState((s) => ({ ...s, currencyLabel: word.trim() || '열매' })),

      reset: () => {
        localStorage.removeItem(KEY)
        setState(initialState)
      },
    }
  }, [state])

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used within AppStoreProvider')
  return s
}
