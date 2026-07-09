// ── 목업 데이터: 챌린지 / 예술 콘텐츠 / 커뮤니티 / 뱃지 ──

export interface Challenge {
  id: string
  title: string
  summary: string
  tag: string
  emoji: string
  durationDays: number
  totalDays: number
  participants: number
  stake: number // 예치 캐시(투자금)
  reward: number // 완주 보상 캐시
  badgeOnClear: string // 완주 시 획득 뱃지 id
  today: string // 오늘의 미션 문구
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: '하루 한 작품, 한 문장',
    summary: '매일 마음에 남은 작품 하나를 한 문장으로 기록해요.',
    tag: '감상',
    emoji: '🖼️',
    durationDays: 3,
    totalDays: 7,
    participants: 1284,
    stake: 3000,
    reward: 4500,
    badgeOnClear: 'b_word',
    today: '오늘 스친 이미지 중 가장 오래 눈이 머문 것을 떠올려 한 줄로 남겨보세요.',
  },
  {
    id: 'c2',
    title: '5분 낙서 드로잉',
    summary: '잘 그리지 않아도 좋아요. 매일 5분, 손을 움직이는 습관.',
    tag: '창작',
    emoji: '✏️',
    durationDays: 6,
    totalDays: 14,
    participants: 862,
    stake: 5000,
    reward: 8000,
    badgeOnClear: 'b_hand',
    today: '책상 위 아무 물건이나 5분간 관찰하며 선으로 옮겨보세요.',
  },
  {
    id: 'c3',
    title: '이번 달 전시 한 곳',
    summary: '한 달에 한 번, 낯선 전시 공간으로 나가보는 챌린지.',
    tag: '전시',
    emoji: '🚪',
    durationDays: 0,
    totalDays: 4,
    participants: 431,
    stake: 10000,
    reward: 16000,
    badgeOnClear: 'b_step',
    today: '가고 싶었던 전시를 하나 정하고 방문 날짜를 캘린더에 적어두세요.',
  },
  {
    id: 'c4',
    title: '주 3회 예술 상식',
    summary: '3분이면 읽는 예술 상식으로 아는 만큼 보이는 눈 만들기.',
    tag: '지식',
    emoji: '📚',
    durationDays: 2,
    totalDays: 12,
    participants: 2190,
    stake: 2000,
    reward: 3000,
    badgeOnClear: 'b_eye',
    today: '오늘의 예술 상식 카드를 한 장 읽고, 새로 안 사실을 아카이브에 남겨요.',
  },
  {
    id: 'c5',
    title: '저자극 사운드 산책',
    summary: '하루 10분, 잔잔한 음악과 함께 걷고 느낀 색을 남겨요.',
    tag: '음악',
    emoji: '🎧',
    durationDays: 0,
    totalDays: 10,
    participants: 654,
    stake: 3000,
    reward: 4500,
    badgeOnClear: 'b_calm',
    today: '오늘 걸으며 들은 소리를 색 하나로 표현한다면 무슨 색일까요?',
  },
]

// ── 예술 콘텐츠 피드 (인스타그램 형식) ──
export type ContentCategory = '전체' | '작품' | '상식' | '전시·정보' | '뉴스' | '저자극'

export interface FeedPost {
  id: string
  author: string
  handle: string
  avatar: string
  category: Exclude<ContentCategory, '전체'>
  gradient: string
  emoji: string
  title: string
  body: string
  tags: string[]
  likes: number
  saves: number
  sponsored?: boolean
}

export const FEED: FeedPost[] = [
  {
    id: 'f1',
    author: '오르세 아카이브',
    handle: '@orsay.daily',
    avatar: '🌾',
    category: '작품',
    gradient: 'linear-gradient(135deg,#e8c07d,#c8613b 70%,#8a3d1f)',
    emoji: '🌻',
    title: '반 고흐 「해바라기」',
    body: '노랑 위에 노랑을 겹쳐 칠한 고흐는, 이 색이 곧 감사와 우정의 언어라 믿었어요. 같은 노랑도 온도가 다르게 보이죠.',
    tags: ['후기인상주의', '색채'],
    likes: 3120,
    saves: 890,
  },
  {
    id: 'f2',
    author: '3분 예술 상식',
    handle: '@art.min',
    avatar: '📚',
    category: '상식',
    gradient: 'linear-gradient(135deg,#6f7a5a,#3f4a34)',
    emoji: '🧠',
    title: '‘임파스토’가 뭐예요?',
    body: '물감을 두껍게 발라 표면에 질감을 만드는 기법이에요. 빛을 받으면 붓 자국이 그림자를 만들어 작품이 살아 움직이는 듯 보여요.',
    tags: ['기법', '용어카드'],
    likes: 1740,
    saves: 1220,
  },
  {
    id: 'f3',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood',
    avatar: '🗂️',
    category: '전시·정보',
    gradient: 'linear-gradient(135deg,#7b5769,#4a3340)',
    emoji: '🎟️',
    title: '이번 주 조용히 보기 좋은 전시 3',
    body: '평일 오전, 사람 적은 시간에 추천하는 전시를 골랐어요. 상업 광고가 아니라 에디터가 직접 다녀와 선별했습니다.',
    tags: ['전시추천', '저자극'],
    likes: 980,
    saves: 2010,
    sponsored: true,
  },
  {
    id: 'f4',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '📰',
    category: '뉴스',
    gradient: 'linear-gradient(135deg,#b58b3c,#7a5a1f)',
    emoji: '🗞️',
    title: '국립현대미술관, 야간 개장 확대',
    body: '주말 저녁까지 관람이 가능해졌어요. 퇴근 후 조명 아래에서 보는 작품은 낮과는 또 다른 얼굴을 보여줍니다.',
    tags: ['소식', '미술관'],
    likes: 620,
    saves: 210,
  },
  {
    id: 'f5',
    author: '고요 사운드',
    handle: '@quiet.sound',
    avatar: '🎧',
    category: '저자극',
    gradient: 'linear-gradient(135deg,#88a0b0,#4d6472)',
    emoji: '🌫️',
    title: '비 오는 날의 피아노 10분',
    body: '알림을 끄고, 화면을 어둡게 하고, 딱 10분만. 아무것도 하지 않아도 되는 시간을 스스로에게 선물해요.',
    tags: ['앰비언트', '휴식'],
    likes: 1450,
    saves: 1680,
  },
  {
    id: 'f6',
    author: '드로잉 로그',
    handle: '@drawlog',
    avatar: '✏️',
    category: '작품',
    gradient: 'linear-gradient(135deg,#c8a27d,#8a6b4d)',
    emoji: '🪑',
    title: '창가 의자 5분 스케치',
    body: '5분 낙서 드로잉 챌린지 3일차. 서툴러도 매일 남기니 손이 조금씩 편해지는 게 느껴져요.',
    tags: ['챌린지인증', '드로잉'],
    likes: 540,
    saves: 130,
  },
]

// ── 커뮤니티 ──
export interface Community {
  id: string
  name: string
  kind: '오픈' | '지정'
  emoji: string
  desc: string
  members: number
  activeToday: number
  lastMessage: string
  color: string
}

export const COMMUNITIES: Community[] = [
  {
    id: 'g1',
    name: '한 문장 감상단',
    kind: '오픈',
    emoji: '✍️',
    desc: '오늘 마음에 남은 작품을 한 문장으로 나누는 오픈 그룹',
    members: 1820,
    activeToday: 214,
    lastMessage: '이 그림 앞에서 왜 눈물이 났을까요…',
    color: '#7b5769',
  },
  {
    id: 'g2',
    name: '주말 전시 메이트',
    kind: '오픈',
    emoji: '🚶',
    desc: '함께 전시 보러 갈 사람을 찾고 후기를 나눠요',
    members: 940,
    activeToday: 88,
    lastMessage: '토요일 오전 국현 같이 가실 분?',
    color: '#6f7a5a',
  },
  {
    id: 'g3',
    name: '5분 드로잉 소모임',
    kind: '지정',
    emoji: '🎨',
    desc: '드로잉 챌린지 참여자 전용 인증 그룹',
    members: 62,
    activeToday: 41,
    lastMessage: '오늘 인증 올렸어요! 다들 화이팅 🔥',
    color: '#c8613b',
  },
  {
    id: 'g4',
    name: '예술 상식 스터디',
    kind: '지정',
    emoji: '📖',
    desc: '주 3회 상식 챌린지 멤버가 함께 복습하는 그룹',
    members: 128,
    activeToday: 33,
    lastMessage: '임파스토 예시 작품 정리해봤어요',
    color: '#b58b3c',
  },
]

// ── 뱃지 ──
export interface Badge {
  id: string
  name: string
  emoji: string
  desc: string
}

export const BADGES: Record<string, Badge> = {
  b_start: { id: 'b_start', name: '첫 발걸음', emoji: '🌱', desc: '타입 진단을 완료했어요' },
  b_word: { id: 'b_word', name: '한 문장의 힘', emoji: '🪶', desc: '감상 챌린지 완주' },
  b_hand: { id: 'b_hand', name: '움직이는 손', emoji: '🖐️', desc: '드로잉 챌린지 완주' },
  b_step: { id: 'b_step', name: '문 밖의 세계', emoji: '🚪', desc: '전시 방문 챌린지 완주' },
  b_eye: { id: 'b_eye', name: '아는 만큼 보이는 눈', emoji: '👁️', desc: '지식 챌린지 완주' },
  b_calm: { id: 'b_calm', name: '고요한 산책자', emoji: '🍃', desc: '저자극 챌린지 완주' },
  b_streak7: { id: 'b_streak7', name: '7일의 리듬', emoji: '🔥', desc: '7일 연속 미션 수행' },
}
