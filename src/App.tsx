import { useState, type ComponentType } from 'react'
import { useStore } from './store'
import { ToastProvider } from './components/ui'
import Onboarding from './screens/Onboarding'
import MyPage from './screens/MyPage'
import ChallengeScreen from './screens/Challenge'
import ArtContent from './screens/ArtContent'
import CommunityScreen from './screens/Community'
import { IconFlag, IconGrid, IconPeople, IconUser } from './components/icons'

type Tab = 'challenge' | 'content' | 'community' | 'my'

const TABS: { id: Tab; label: string; icon: ComponentType }[] = [
  { id: 'challenge', label: '챌린지', icon: IconFlag },
  { id: 'content', label: '콘텐츠', icon: IconGrid },
  { id: 'community', label: '커뮤니티', icon: IconPeople },
  { id: 'my', label: '마이', icon: IconUser },
]

export default function App() {
  const { state } = useStore()
  const [tab, setTab] = useState<Tab>('challenge')

  return (
    <div className="phone">
      <ToastProvider>
        {!state.onboarded ? (
          <Onboarding />
        ) : (
          <>
            {tab === 'challenge' && <ChallengeScreen />}
            {tab === 'content' && <ArtContent />}
            {tab === 'community' && <CommunityScreen />}
            {tab === 'my' && <MyPage />}

            <nav className="tabbar">
              {TABS.map((t) => {
                const Icon = t.icon
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    className={active ? 'tabbar__item is-active' : 'tabbar__item'}
                    onClick={() => setTab(t.id)}
                  >
                    <span className="tabbar__icon">
                      <Icon />
                    </span>
                    {t.label}
                  </button>
                )
              })}
            </nav>
          </>
        )}
      </ToastProvider>
    </div>
  )
}
