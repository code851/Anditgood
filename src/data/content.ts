// ── 목업 데이터: 챌린지 / 예술 콘텐츠 / 커뮤니티 / 뱃지 ──

// 완주 시 투자한 열매가 전달되는 예술 소외계층
export interface Beneficiary {
  name: string
  group: string
  emoji: string
}

export interface Challenge {
  id: string
  title: string
  summary: string
  tag: string
  emoji: string
  durationDays: number
  totalDays: number
  participants: number
  stake: number // 투자하는 열매 (완주 시 전액 기부됨)
  badgeOnClear: string // 완주 시 획득 뱃지 id
  today: string // 오늘의 미션 문구
  beneficiary: Beneficiary
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
    stake: 3,
    badgeOnClear: 'b_word',
    today: '오늘 스친 이미지 중 가장 오래 눈이 머문 것을 떠올려 한 줄로 남겨보세요.',
    beneficiary: { name: '햇살 지역아동센터', group: '한부모가정 아이들', emoji: '🌤️' },
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
    stake: 5,
    badgeOnClear: 'b_hand',
    today: '책상 위 아무 물건이나 5분간 관찰하며 선으로 옮겨보세요.',
    beneficiary: { name: '느린걸음 미술공방', group: '발달장애 예술인', emoji: '🎨' },
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
    stake: 8,
    badgeOnClear: 'b_step',
    today: '가고 싶었던 전시를 하나 정하고 방문 날짜를 캘린더에 적어두세요.',
    beneficiary: { name: '다솜 보육원', group: '보호종료 청소년', emoji: '🏠' },
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
    stake: 2,
    badgeOnClear: 'b_eye',
    today: '오늘의 예술 상식 카드를 한 장 읽고, 새로 안 사실을 아카이브에 남겨요.',
    beneficiary: { name: '밝은세상 문화모임', group: '시각장애인 예술활동', emoji: '👐' },
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
    stake: 3,
    badgeOnClear: 'b_calm',
    today: '오늘 걸으며 들은 소리를 색 하나로 표현한다면 무슨 색일까요?',
    beneficiary: { name: '고운소리 복지관', group: '저소득 어르신 음악교실', emoji: '🎵' },
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
  media?: 'reel' | 'carousel' // 인스타 탐색 그리드 아이콘용
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
    media: 'carousel',
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
    media: 'reel',
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
    media: 'reel',
  },
]

// ── 커뮤니티 (소규모 채팅방, 최대 6명) ──
export const ROOM_CAPACITY = 6

export interface Member {
  name: string
  avatar: string
}

export interface Community {
  id: string
  name: string
  kind: '오픈' | '지정'
  emoji: string
  desc: string
  color: string
  challengeId: string // 이 방이 함께하는 챌린지
  roster: Member[] // 나를 제외한 참여자 (최대 6명까지 채워짐)
}

export const COMMUNITIES: Community[] = [
  {
    id: 'g1',
    name: '한 문장 감상단',
    kind: '오픈',
    emoji: '✍️',
    desc: '오늘 마음에 남은 작품을 한 문장으로 나눠요',
    color: '#7b5769',
    challengeId: 'c1',
    roster: [
      { name: '서현지', avatar: '🐰' },
      { name: '민준', avatar: '🐻' },
      { name: '유나', avatar: '🐤' },
    ],
  },
  {
    id: 'g2',
    name: '5분 드로잉 크루',
    kind: '지정',
    emoji: '🎨',
    desc: '드로잉 챌린지 인증을 함께 올리는 소모임',
    color: '#c8613b',
    challengeId: 'c2',
    roster: [
      { name: '도윤', avatar: '🦊' },
      { name: '서현지', avatar: '🐰' },
      { name: '하람', avatar: '🐨' },
      { name: '지우', avatar: '🐧' },
    ],
  },
  {
    id: 'g3',
    name: '주말 전시 메이트',
    kind: '오픈',
    emoji: '🚶',
    desc: '함께 전시 보러 갈 사람을 찾고 후기를 나눠요',
    color: '#6f7a5a',
    challengeId: 'c3',
    roster: [
      { name: '수아', avatar: '🐹' },
      { name: '건우', avatar: '🐢' },
    ],
  },
  {
    id: 'g4',
    name: '3분 예술 상식방',
    kind: '지정',
    emoji: '📖',
    desc: '주 3회 상식 챌린지 멤버의 복습방',
    color: '#b58b3c',
    challengeId: 'c4',
    roster: [
      { name: '예린', avatar: '🐱' },
      { name: '태오', avatar: '🐯' },
      { name: '민준', avatar: '🐻' },
    ],
  },
  {
    id: 'g5',
    name: '고요 산책 클럽',
    kind: '오픈',
    emoji: '🎧',
    desc: '저자극 사운드 산책을 나누는 잔잔한 방',
    color: '#6f88ab',
    challengeId: 'c5',
    roster: [
      { name: '나리', avatar: '🦉' },
      { name: '준서', avatar: '🐳' },
      { name: '소민', avatar: '🐭' },
    ],
  },
  {
    id: 'g6',
    name: '오늘의 감상 나눔 (마감)',
    kind: '오픈',
    emoji: '🌙',
    desc: '정원이 가득 찬 인기 감상방',
    color: '#9481b0',
    challengeId: 'c1',
    roster: [
      { name: '하윤', avatar: '🐰' },
      { name: '지호', avatar: '🐻' },
      { name: '아인', avatar: '🐤' },
      { name: '루아', avatar: '🦊' },
      { name: '시우', avatar: '🐨' },
      { name: '초록', avatar: '🐸' },
    ],
  },
]

// ── 채팅 메시지 ──
export interface ChatMessage {
  id: string
  kind: 'chat' | 'mission' // 일반 대화 / 미션 완료 알림
  author: string
  avatar: string
  text: string
  date: string // ISO
  mine?: boolean
}

// 방별 시드 대화 (미션 완료 알림 포함)
export const ROOM_SEED: Record<string, ChatMessage[]> = {
  g1: [
    { id: 's1', kind: 'chat', author: '유나', avatar: '🐤', text: '다들 오늘 어떤 작품 보셨어요?', date: '2026-07-11T00:10:00.000Z' },
    { id: 's2', kind: 'mission', author: '서현지', avatar: '🐰', text: '하루 한 작품, 한 문장', date: '2026-07-11T00:22:00.000Z' },
    { id: 's3', kind: 'chat', author: '서현지', avatar: '🐰', text: '지하철 광고 속 색 조합이 오늘따라 예뻐 보였어요 :)', date: '2026-07-11T00:23:00.000Z' },
    { id: 's4', kind: 'mission', author: '민준', avatar: '🐻', text: '하루 한 작품, 한 문장', date: '2026-07-11T00:40:00.000Z' },
  ],
  g2: [
    { id: 's1', kind: 'chat', author: '도윤', avatar: '🦊', text: '오늘 5분 드로잉 다들 하셨나요 ✏️', date: '2026-07-11T00:05:00.000Z' },
    { id: 's2', kind: 'mission', author: '하람', avatar: '🐨', text: '5분 낙서 드로잉', date: '2026-07-11T00:18:00.000Z' },
    { id: 's3', kind: 'chat', author: '하람', avatar: '🐨', text: '머그컵 그렸는데 손잡이가 자꾸 이상해요 😂', date: '2026-07-11T00:19:00.000Z' },
    { id: 's4', kind: 'mission', author: '지우', avatar: '🐧', text: '5분 낙서 드로잉', date: '2026-07-11T00:31:00.000Z' },
  ],
  g3: [
    { id: 's1', kind: 'chat', author: '수아', avatar: '🐹', text: '토요일 오전 국현 같이 가실 분 있나요?', date: '2026-07-10T23:50:00.000Z' },
    { id: 's2', kind: 'chat', author: '건우', avatar: '🐢', text: '저요! 11시 어때요?', date: '2026-07-10T23:58:00.000Z' },
  ],
  g4: [
    { id: 's1', kind: 'mission', author: '예린', avatar: '🐱', text: '주 3회 예술 상식', date: '2026-07-11T00:12:00.000Z' },
    { id: 's2', kind: 'chat', author: '예린', avatar: '🐱', text: '오늘 상식카드 임파스토 정리해봤어요!', date: '2026-07-11T00:13:00.000Z' },
    { id: 's3', kind: 'mission', author: '태오', avatar: '🐯', text: '주 3회 예술 상식', date: '2026-07-11T00:26:00.000Z' },
  ],
  g5: [
    { id: 's1', kind: 'chat', author: '나리', avatar: '🦉', text: '오늘 산책하며 들은 소리는 연한 하늘색이었어요', date: '2026-07-11T00:02:00.000Z' },
    { id: 's2', kind: 'mission', author: '준서', avatar: '🐳', text: '저자극 사운드 산책', date: '2026-07-11T00:20:00.000Z' },
  ],
  g6: [
    { id: 's1', kind: 'chat', author: '하윤', avatar: '🐰', text: '여긴 정원이 꽉 찼네요 😌', date: '2026-07-10T22:00:00.000Z' },
  ],
}

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
