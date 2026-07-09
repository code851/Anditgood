import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ArtTypeId } from './data/artTypes'
import { CHALLENGES } from './data/content'

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
}

export interface AppState {
  onboarded: boolean
  type: ArtTypeId | null
  name: string
  bio: string
  goal: string
  cash: number
  streak: number
  badges: string[]
  joined: JoinedChallenge[]
  archive: ArchiveEntry[]
  savedPosts: string[]
  likedPosts: string[]
  joinedGroups: string[]
}

const initialState: AppState = {
  onboarded: false,
  type: null,
  name: '',
  bio: '',
  goal: '',
  cash: 20000,
  streak: 0,
  badges: [],
  joined: [],
  archive: [],
  savedPosts: [],
  likedPosts: [],
  joinedGroups: ['g1'],
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
  joinChallenge: (id: string) => void
  checkInChallenge: (id: string, note?: string) => { rewarded: boolean; badge?: string }
  addArchive: (entry: Omit<ArchiveEntry, 'id' | 'date'>) => void
  toggleSave: (postId: string) => void
  toggleLike: (postId: string) => void
  toggleGroup: (groupId: string) => void
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
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

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

      joinChallenge: (id) =>
        setState((s) => {
          if (s.joined.some((j) => j.challengeId === id)) return s
          const ch = CHALLENGES.find((c) => c.id === id)
          const stake = ch?.stake ?? 0
          if (s.cash < stake) return s
          return {
            ...s,
            cash: s.cash - stake,
            joined: [...s.joined, { challengeId: id, progress: 0 }],
          }
        }),

      checkInChallenge: (id, note) => {
        let result: { rewarded: boolean; badge?: string } = { rewarded: false }
        setState((s) => {
          const ch = CHALLENGES.find((c) => c.id === id)
          if (!ch) return s
          const t = today()
          const joined = s.joined.map((j) => {
            if (j.challengeId !== id) return j
            if (j.lastCheck === t) return j // 하루 한 번
            return { ...j, progress: Math.min(j.progress + 1, ch.totalDays), lastCheck: t }
          })
          const target = joined.find((j) => j.challengeId === id)
          if (!target || target.lastCheck !== t) return s // 이미 오늘 인증함

          let cash = s.cash
          let badges = s.badges
          const newStreak = s.streak + 1
          const archive = note
            ? [
                {
                  id: makeId(),
                  challengeId: id,
                  text: note,
                  date: new Date().toISOString(),
                },
                ...s.archive,
              ]
            : s.archive

          // 완주 판정
          if (target.progress >= ch.totalDays) {
            cash += ch.reward
            if (!badges.includes(ch.badgeOnClear)) badges = [...badges, ch.badgeOnClear]
            result = { rewarded: true, badge: ch.badgeOnClear }
          }
          if (newStreak >= 7 && !badges.includes('b_streak7')) {
            badges = [...badges, 'b_streak7']
          }
          return { ...s, joined, cash, badges, streak: newStreak, archive }
        })
        return result
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
