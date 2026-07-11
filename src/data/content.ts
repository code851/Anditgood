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
  image?: string // 업로드한 이미지 (data URL)
  mine?: boolean // 내가 올린 게시물
}

// 카테고리별 기본 그라데이션 (직접 업로드 시 사용)
export const CATEGORY_GRADIENT: Record<Exclude<ContentCategory, '전체'>, string> = {
  작품: 'linear-gradient(135deg,#e8a15c,#c8613b 70%,#8a3d1f)',
  상식: 'linear-gradient(135deg,#6f7a5a,#3f4a34)',
  '전시·정보': 'linear-gradient(135deg,#7b5769,#4a3340)',
  뉴스: 'linear-gradient(135deg,#b58b3c,#7a5a1f)',
  저자극: 'linear-gradient(135deg,#88a0b0,#4d6472)',
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
  {
    id: 'f7',
    author: '오랑주리 노트',
    handle: '@orangerie',
    avatar: '🪷',
    category: '작품',
    gradient: 'linear-gradient(135deg,#8fb7c9,#4f7f8f 70%,#345863)',
    emoji: '🪷',
    title: '모네 「수련」',
    body: '경계가 사라진 물 위의 빛. 모네는 형태보다 시간과 공기를 그리려 했어요. 가까이서 보면 붓질, 멀리서 보면 연못이 됩니다.',
    tags: ['인상주의', '빛'],
    likes: 2740,
    saves: 1310,
    media: 'carousel',
  },
  {
    id: 'f8',
    author: '3분 예술 상식',
    handle: '@art.min',
    avatar: '🎨',
    category: '상식',
    gradient: 'linear-gradient(135deg,#c8a24a,#8a6b1f)',
    emoji: '🟡',
    title: '보색이 뭐예요?',
    body: '색상환에서 마주 보는 두 색이에요. 옆에 두면 서로를 가장 선명하게 만들어요. 고흐의 파랑과 주황이 대표적이죠.',
    tags: ['색이론', '용어카드'],
    likes: 1980,
    saves: 1440,
  },
  {
    id: 'f9',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '📰',
    category: '뉴스',
    gradient: 'linear-gradient(135deg,#d98a4a,#a63f2e)',
    emoji: '🦁',
    title: '베니스 비엔날레 개막',
    body: '세계 미술의 축제가 다시 문을 열었어요. 올해 한국관 주제와 화제의 작가들을 짧게 정리했습니다.',
    tags: ['비엔날레', '국제전'],
    likes: 720,
    saves: 260,
  },
  {
    id: 'f10',
    author: '고요 사운드',
    handle: '@quiet.sound',
    avatar: '🎧',
    category: '저자극',
    gradient: 'linear-gradient(135deg,#a9b8bf,#6d7f86)',
    emoji: '◻️',
    title: '느린 붓질 15분',
    body: '아무 말 없이, 종이에 물감이 번지는 소리만. 바라보기만 해도 마음의 속도가 느려지는 영상이에요.',
    tags: ['ASMR', '휴식'],
    likes: 1610,
    saves: 1720,
    media: 'reel',
  },
  {
    id: 'f11',
    author: '클림트 룸',
    handle: '@klimt.room',
    avatar: '💛',
    category: '작품',
    gradient: 'linear-gradient(135deg,#e8c559,#b8901f 70%,#6e5312)',
    emoji: '💛',
    title: '클림트 「키스」',
    body: '금빛 장식 속 두 사람. 클림트는 금박을 실제로 붙여 성스러움과 관능을 동시에 담았어요.',
    tags: ['빈분리파', '금박'],
    likes: 3480,
    saves: 2020,
  },
  {
    id: 'f12',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood',
    avatar: '🗂️',
    category: '전시·정보',
    gradient: 'linear-gradient(135deg,#6f7a9a,#3f4a63)',
    emoji: '🏛️',
    title: '이번 달 무료 전시 5',
    body: '지갑 부담 없이 즐기는 무료 전시를 모았어요. 에디터가 직접 다녀와 대기 시간과 동선까지 체크했습니다.',
    tags: ['무료전시', '큐레이션'],
    likes: 1120,
    saves: 2380,
    sponsored: true,
  },
  {
    id: 'f13',
    author: '3분 예술 상식',
    handle: '@art.min',
    avatar: '📐',
    category: '상식',
    gradient: 'linear-gradient(135deg,#7a8a6a,#47533a)',
    emoji: '📐',
    title: '원근법 한눈에',
    body: '하나의 소실점으로 모이는 선. 르네상스 화가들은 이 규칙으로 평면에 깊이를 만들었어요.',
    tags: ['기법', '르네상스'],
    likes: 1340,
    saves: 990,
  },
  {
    id: 'f14',
    author: '뭉크 하우스',
    handle: '@munch.house',
    avatar: '😮',
    category: '작품',
    gradient: 'linear-gradient(135deg,#e59a4a,#c14f3a 70%,#7a2f2f)',
    emoji: '🌫️',
    title: '뭉크 「절규」',
    body: '핏빛 하늘 아래 흔들리는 형상. 뭉크는 자연을 관통하는 “거대한 비명”을 느꼈다고 적었어요.',
    tags: ['표현주의', '불안'],
    likes: 2210,
    saves: 870,
  },
  {
    id: 'f15',
    author: '아트마켓 리포트',
    handle: '@artmarket',
    avatar: '💰',
    category: '뉴스',
    gradient: 'linear-gradient(135deg,#b58b3c,#6e5312)',
    emoji: '🔨',
    title: '경매 최고가 경신',
    body: '한 추상화가 예상가를 훌쩍 넘겨 낙찰됐어요. 최근 미술 시장의 흐름을 숫자로 살펴봅니다.',
    tags: ['경매', '시장'],
    likes: 540,
    saves: 300,
  },
  {
    id: 'f16',
    author: '느린 미술관',
    handle: '@slow.museum',
    avatar: '🌅',
    category: '저자극',
    gradient: 'linear-gradient(135deg,#e6b7a0,#9a7a86 70%,#5f5566)',
    emoji: '🌅',
    title: '새벽 미술관 산책',
    body: '문 열기 전, 텅 빈 전시장의 고요. 소리를 끄고 함께 걸어보세요. 아무도 없는 작품 앞의 사치.',
    tags: ['앰비언트', '산책'],
    likes: 1290,
    saves: 1560,
    media: 'reel',
  },
  {
    id: 'f17',
    author: '한국화 노트',
    handle: '@ink.wash',
    avatar: '🎋',
    category: '작품',
    gradient: 'linear-gradient(135deg,#cdd3c2,#8f9a82 70%,#5c6650)',
    emoji: '🎋',
    title: '여백의 미',
    body: '그리지 않은 공간이 말을 걸어요. 한국화의 여백은 비움이 아니라 숨 쉴 자리를 두는 일이에요.',
    tags: ['한국화', '여백'],
    likes: 1470,
    saves: 1180,
  },
  {
    id: 'f18',
    author: '3분 예술 상식',
    handle: '@art.min',
    avatar: '🏺',
    category: '상식',
    gradient: 'linear-gradient(135deg,#b98d63,#7a5a3a)',
    emoji: '🏺',
    title: '도자기의 곡선',
    body: '달항아리의 살짝 비뚤어진 선. 완벽하지 않아서 더 따뜻한, 한국 백자만의 미감이에요.',
    tags: ['백자', '공예'],
    likes: 980,
    saves: 760,
  },
  {
    id: 'f19',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '📰',
    category: '뉴스',
    gradient: 'linear-gradient(135deg,#9a8f7a,#5f5545)',
    emoji: '🖼️',
    title: '미술관 야간 개장 인기',
    body: '퇴근 후 관람객이 늘고 있어요. 도시가 잠든 시간, 작품과 단둘이 마주하는 경험이 새 트렌드로.',
    tags: ['소식', '트렌드'],
    likes: 610,
    saves: 240,
  },
  {
    id: 'f20',
    author: '드로잉 로그',
    handle: '@drawlog',
    avatar: '✏️',
    category: '작품',
    gradient: 'linear-gradient(135deg,#c8a27d,#8a6b4d)',
    emoji: '🖍️',
    title: '오늘의 색연필 습작',
    body: '5분 낙서 드로잉 7일차. 같은 컵을 매일 그렸더니 색을 겹치는 손끝이 조금 대담해졌어요.',
    tags: ['챌린지인증', '색연필'],
    likes: 430,
    saves: 110,
  },
  {
    id: 'f21',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood',
    avatar: '🎟️',
    category: '전시·정보',
    gradient: 'linear-gradient(135deg,#8a6f9a,#4a3340)',
    emoji: '🎟️',
    title: '주말 도슨트 추천',
    body: '작품이 훨씬 깊게 보이는 해설 투어. 이번 주말 신청 가능한 무료 도슨트를 정리했어요.',
    tags: ['도슨트', '주말'],
    likes: 880,
    saves: 1340,
  },
  {
    id: 'f22',
    author: '고요 사운드',
    handle: '@quiet.sound',
    avatar: '🎧',
    category: '저자극',
    gradient: 'linear-gradient(135deg,#9fb0a6,#5f6f66)',
    emoji: '🍃',
    title: '빗소리와 수묵 10분',
    body: '창밖 빗소리 위로 번지는 먹. 오늘 하루도 수고한 나에게 주는, 아무것도 안 해도 되는 10분.',
    tags: ['앰비언트', '수묵'],
    likes: 1180,
    saves: 1490,
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
