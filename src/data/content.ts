// ── 목업 데이터: 챌린지 / 예술 콘텐츠 / 커뮤니티 / 뱃지 ──

// 완주 후 사용자가 선택하는 기부 대상 (시각적으로 고름)
export interface DonationTarget {
  id: string
  name: string
  group: string
  emoji: string
  gradient: string
  blurb: string
}

export interface Challenge {
  id: string
  title: string
  tag: string // 예술 카테고리
  emoji: string
  color: string
  gradient: string
  totalDays: number // 약 30일, 챌린지마다 상이
  participants: number
  suggested: number // 기본 제안 투자량
  intro: string // 챌린지의 깊이/목적
  dailyMissions: string[] // 날마다 다른 깊이 있는 미션 (day 로 순환)
  badgeOnClear: string
}

export function dailyMission(ch: Challenge, dayIndex: number): string {
  return ch.dailyMissions[dayIndex % ch.dailyMissions.length]
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: '서른 번의 응시',
    tag: '감상·글',
    emoji: '🖼️',
    color: '#8f6f88',
    gradient: 'linear-gradient(150deg,#8f6f88,#4a3340)',
    totalDays: 30,
    participants: 1284,
    suggested: 5,
    intro: '매일 한 작품을 오래 응시하고, 떠오른 생각을 한 문장으로 남깁니다. 서른 번의 응시 끝에, 문장들 사이에서 몰랐던 나를 만나요.',
    badgeOnClear: 'b_word',
    dailyMissions: [
      '오늘 눈이 가장 오래 머문 이미지를 떠올려, 그 앞에서 든 첫 감정을 한 문장으로 적어보세요.',
      '좋았던 작품 하나를 골라, 왜 좋았는지 ‘나’를 주어로 설명해보세요.',
      '불편했던 이미지를 떠올리고, 그 불편함이 내 안의 무엇을 건드렸는지 적어보세요.',
      '말로 설명하기 어려운 장면을 색 하나로 표현한다면? 그 이유도 함께 남겨보세요.',
      '오늘 본 것 중 내일도 기억하고 싶은 한 장면을 문장으로 붙잡아두세요.',
      '누군가에게 보여주고 싶은 작품과, 그 사람에게 하고 싶은 말을 적어보세요.',
      '지금 내 마음과 가장 닮은 작품을 고르고, 어디가 닮았는지 써보세요.',
    ],
  },
  {
    id: 'c2',
    title: '매일의 드로잉 일기',
    tag: '표현·드로잉',
    emoji: '✏️',
    color: '#c8613b',
    gradient: 'linear-gradient(150deg,#d98a5f,#8a3d1f)',
    totalDays: 21,
    participants: 862,
    suggested: 4,
    intro: '잘 그리는 게 목적이 아니에요. 매일 5분, 손끝으로 오늘의 나를 표현합니다. 스물한 장이 쌓이면 나만의 시선이 보여요.',
    badgeOnClear: 'b_hand',
    dailyMissions: [
      '지금 눈앞의 물건 하나를 5분간 관찰하며 선으로 옮겨보세요.',
      '오늘의 기분을 추상적인 선과 도형만으로 그려보세요.',
      '기억 속 한 장면을 떠오르는 대로 그려보세요. 정확하지 않아도 좋아요.',
      '한 가지 색(또는 한 자루 펜)만으로 오늘을 그려보세요.',
      '대상만 보고 종이는 보지 않는 ‘블라인드 드로잉’을 해보세요.',
      '오늘 만난 사람 또는 나 자신을 캐릭터로 그려보세요.',
      '내가 그린 것들 중 하나를 골라 제목을 붙여보세요.',
    ],
  },
  {
    id: 'c3',
    title: '낯선 곳으로 한 걸음',
    tag: '경험·탐험',
    emoji: '🚪',
    color: '#6f7a5a',
    gradient: 'linear-gradient(150deg,#87a06f,#47533a)',
    totalDays: 30,
    participants: 431,
    suggested: 8,
    intro: '익숙함에서 매일 한 걸음씩. 낯선 예술 경험에 나를 노출시키며, 세계가 넓어지는 감각을 쌓아요.',
    badgeOnClear: 'b_step',
    dailyMissions: [
      '가본 적 없는 전시·공간을 하나 검색해 위시리스트에 담아보세요.',
      '평소 안 듣던 장르의 곡을 한 곡 끝까지 들어보세요.',
      '오늘 지나친 거리에서 ‘작품’이라 부를 만한 장면을 하나 찾아보세요.',
      '낯선 작가의 이름 하나를 익히고, 대표작 한 점을 봐두세요.',
      '이번 주 갈 전시·공연을 하나 정하고 날짜를 적어보세요.',
      '익숙한 길 대신 새로운 길로 걸으며 마주친 색을 기록해보세요.',
    ],
  },
  {
    id: 'c4',
    title: '아는 만큼의 세계',
    tag: '지식·탐구',
    emoji: '📚',
    color: '#b58b3c',
    gradient: 'linear-gradient(150deg,#d3a94e,#7a5a1f)',
    totalDays: 14,
    participants: 2190,
    suggested: 3,
    intro: '매일 3분, 예술의 언어를 하나씩 익혀요. 아는 만큼 보이는 눈으로, 세상이 더 촘촘하게 들어옵니다.',
    badgeOnClear: 'b_eye',
    dailyMissions: [
      '오늘의 예술 용어 하나를 찾아 내 말로 다시 설명해보세요.',
      '좋아하는 작품의 ‘기법’을 하나 알아보고 메모하세요.',
      '한 미술 사조의 특징을 세 줄로 정리해보세요.',
      '작가 한 명의 삶에서 인상 깊은 한 가지를 적어보세요.',
      '오늘 배운 지식으로 다시 보고 싶은 작품을 골라보세요.',
      '예술과 관련된 질문 하나를 만들고, 나만의 답을 적어보세요.',
    ],
  },
  {
    id: 'c5',
    title: '소리로 그리는 하루',
    tag: '음악·소리',
    emoji: '🎧',
    color: '#4d7c8a',
    gradient: 'linear-gradient(150deg,#5f93a0,#2f5661)',
    totalDays: 28,
    participants: 654,
    suggested: 5,
    intro: '매일 10분, 소리에 집중하며 오늘의 감정을 색과 말로 옮깁니다. 스물여덟 번의 귀 기울임이 마음을 정돈해요.',
    badgeOnClear: 'b_calm',
    dailyMissions: [
      '지금 들리는 소리에 집중해, 그 소리를 색 하나로 표현해보세요.',
      '오늘의 기분에 어울리는 곡을 한 곡 고르고 이유를 적어보세요.',
      '가사 없는 음악을 들으며 떠오른 장면을 문장으로 남겨보세요.',
      '10분 산책하며 들은 소리들을 목록으로 적어보세요.',
      '어릴 적 기억을 부르는 소리 하나를 떠올려보세요.',
      '누군가에게 들려주고 싶은 곡과, 그 마음을 적어보세요.',
      '침묵 속에 3분간 머물고, 그때의 마음을 기록해보세요.',
    ],
  },
  {
    id: 'c6',
    title: '매일 한 컷의 시선',
    tag: '사진·시선',
    emoji: '📷',
    color: '#9a7ba0',
    gradient: 'linear-gradient(150deg,#9a7ba0,#533f5f)',
    totalDays: 30,
    participants: 977,
    suggested: 5,
    intro: '휴대폰 한 대면 충분해요. 매일 한 컷, 내 눈이 머문 곳을 남기며 나만의 시선을 발견합니다.',
    badgeOnClear: 'b_lens',
    dailyMissions: [
      '오늘 가장 마음이 멈춘 순간을 한 컷 찍어보세요.',
      '‘빛’을 주제로 한 장을 담아보세요.',
      '발밑, 천장 등 평소 안 보던 각도로 찍어보세요.',
      '같은 대상을 세 가지 다른 방식으로 담아보세요.',
      '색 하나를 정하고, 그 색을 찾아 하루를 담아보세요.',
      '누군가에게 보여주고 싶은 오늘의 한 컷을 골라보세요.',
    ],
  },
  {
    id: 'c7',
    title: '목소리를 내는 연습',
    tag: '목소리·표현',
    emoji: '🎤',
    color: '#d97b7f',
    gradient: 'linear-gradient(150deg,#d97b7f,#8a3d4a)',
    totalDays: 21,
    participants: 540,
    suggested: 4,
    intro: '표현은 근육이에요. 매일 짧게, 내 생각을 소리 내어 말하거나 씁니다. 스물한 번이면 목소리에 힘이 붙어요.',
    badgeOnClear: 'b_voice',
    dailyMissions: [
      '오늘 느낀 것을 30초 동안 소리 내어 말해보세요(녹음해도 좋아요).',
      '좋아하는 문장을 낭독하고, 왜 좋은지 말해보세요.',
      '‘나는 ___할 때 살아있음을 느낀다’를 채워 말해보세요.',
      '오늘의 의견 하나를 한 문단으로 표현해보세요.',
      '누군가에게 전하지 못한 말을 글로 적어보세요.',
      '내 하루를 한 편의 짧은 이야기로 말해보세요.',
    ],
  },
  {
    id: 'c8',
    title: '몸으로 말하기',
    tag: '움직임·표현',
    emoji: '🕺',
    color: '#6f9e73',
    gradient: 'linear-gradient(150deg,#6f9e73,#37543a)',
    totalDays: 21,
    participants: 388,
    suggested: 4,
    intro: '매일 잠깐, 몸의 언어로 오늘을 표현합니다. 서툴러도 나만의 리듬으로, 몸이 기억하는 감정을 꺼내요.',
    badgeOnClear: 'b_move',
    dailyMissions: [
      '지금 기분을 한 동작으로 표현해보세요.',
      '좋아하는 곡에 맞춰 30초 자유롭게 움직여보세요.',
      '느리게 걷기 3분, 몸의 감각에 집중해보세요.',
      '손끝만으로 오늘의 감정을 표현해보세요.',
      '거울 앞에서 나를 향해 응원 동작 하나를 해보세요.',
      '숨에 집중하며 1분간 스트레칭하고 느낌을 적어보세요.',
    ],
  },
]

export const DONATION_TARGETS: DonationTarget[] = [
  {
    id: 't_kids',
    name: '햇살 지역아동센터',
    group: '한부모가정 아이들',
    emoji: '🌤️',
    gradient: 'linear-gradient(160deg,#ffd9a3,#e8895f)',
    blurb: '미술 재료가 부족한 아이들에게 그림 도구를 전해요.',
  },
  {
    id: 't_dev',
    name: '느린걸음 미술공방',
    group: '발달장애 예술인',
    emoji: '🎨',
    gradient: 'linear-gradient(160deg,#c9e0b8,#7fa86a)',
    blurb: '느리지만 빛나는 작가들의 창작을 응원해요.',
  },
  {
    id: 't_teen',
    name: '다솜 보육원',
    group: '보호종료 청소년',
    emoji: '🏠',
    gradient: 'linear-gradient(160deg,#bcd6ea,#6f88ab)',
    blurb: '홀로서기를 앞둔 청소년의 문화생활을 함께해요.',
  },
  {
    id: 't_blind',
    name: '밝은세상 문화모임',
    group: '시각장애인 예술활동',
    emoji: '👐',
    gradient: 'linear-gradient(160deg,#e5d3ef,#9481b0)',
    blurb: '손끝으로 예술을 만나는 시간을 만들어요.',
  },
  {
    id: 't_senior',
    name: '고운소리 복지관',
    group: '저소득 어르신 음악교실',
    emoji: '🎵',
    gradient: 'linear-gradient(160deg,#f2d7b0,#c99a54)',
    blurb: '어르신들의 노래하는 오후를 선물해요.',
  },
  {
    id: 't_hospital',
    name: '반짝별 소아병동',
    group: '입원 아동',
    emoji: '🧸',
    gradient: 'linear-gradient(160deg,#f6c6cf,#d97b8a)',
    blurb: '병실에서도 그림 그릴 수 있게 도와요.',
  },
]

// ── 예술 콘텐츠 피드 (인스타그램 형식) ──
export type ContentCategory =
  | '전체'
  | '1분 예술상식'
  | '예술 칼럼'
  | '문화예술 정보'
  | '예술 뉴스'

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

// 카테고리별 기본 그라데이션 (직접 업로드 시 사용) — 잔잔한 톤
export const CATEGORY_GRADIENT: Record<Exclude<ContentCategory, '전체'>, string> = {
  '1분 예술상식': 'linear-gradient(135deg,#c9a97e,#8a6b4a)',
  '예술 칼럼': 'linear-gradient(135deg,#9a8fa6,#5f5568)',
  '문화예술 정보': 'linear-gradient(135deg,#8ba3a8,#4f6a70)',
  '예술 뉴스': 'linear-gradient(135deg,#a3ab8c,#5f6a4d)',
}

export const FEED: FeedPost[] = [
  {
    id: 'f1',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🌻',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#d8b98a,#9a7a52)',
    emoji: '🌻',
    title: '반 고흐 「해바라기」',
    body: '노랑 위에 노랑을 겹쳐 칠한 고흐는, 이 색을 감사와 우정의 언어라 여겼어요. 같은 노랑도 온도가 다르게 느껴지죠.',
    tags: ['후기인상주의', '색채'],
    likes: 1240,
    saves: 610,
    media: 'carousel',
  },
  {
    id: 'f2',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🧠',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#c9a97e,#8a6b4a)',
    emoji: '🧠',
    title: '‘임파스토’가 뭐예요?',
    body: '물감을 두껍게 발라 표면에 질감을 만드는 기법이에요. 빛을 받으면 붓 자국이 그림자를 만들어 그림이 살아 있는 듯 보여요.',
    tags: ['기법', '용어카드'],
    likes: 980,
    saves: 720,
  },
  {
    id: 'f3',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🎨',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#cbb48f,#8f7250)',
    emoji: '🎨',
    title: '보색이 뭐예요?',
    body: '색상환에서 마주 보는 두 색이에요. 나란히 두면 서로를 가장 또렷하게 만들어 줍니다. 고흐의 파랑과 주황처럼요.',
    tags: ['색이론', '용어카드'],
    likes: 1120,
    saves: 840,
  },
  {
    id: 'f4',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '📐',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#d8b98a,#9a7a52)',
    emoji: '📐',
    title: '원근법 한눈에',
    body: '하나의 소실점으로 모이는 선들. 르네상스 화가들은 이 규칙으로 평면 위에 깊이를 만들었어요.',
    tags: ['기법', '르네상스'],
    likes: 760,
    saves: 540,
  },
  {
    id: 'f5',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🪷',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#c9a97e,#8a6b4a)',
    emoji: '🪷',
    title: '모네 「수련」의 빛',
    body: '경계가 사라진 물 위의 빛. 모네는 형태보다 시간과 공기를 담으려 했어요. 가까이선 붓질, 멀리선 연못이 됩니다.',
    tags: ['인상주의', '빛'],
    likes: 1360,
    saves: 910,
    media: 'carousel',
  },
  {
    id: 'f6',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🏺',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#cbb48f,#8f7250)',
    emoji: '🏺',
    title: '달항아리의 곡선',
    body: '살짝 비뚤어진 선이 오히려 따뜻하죠. 완벽하지 않아서 더 넉넉한, 조선 백자만의 미감이에요.',
    tags: ['백자', '공예'],
    likes: 690,
    saves: 520,
  },
  {
    id: 'f7',
    author: '1분 예술상식',
    handle: '@art.min',
    avatar: '🎋',
    category: '1분 예술상식',
    gradient: 'linear-gradient(135deg,#d8b98a,#9a7a52)',
    emoji: '🎋',
    title: '여백의 미',
    body: '그리지 않은 공간이 말을 걸어요. 한국화의 여백은 비움이 아니라, 숨 쉴 자리를 남겨 두는 일이에요.',
    tags: ['한국화', '여백'],
    likes: 880,
    saves: 660,
  },
  {
    id: 'f8',
    author: '안디잇굿 에디터',
    handle: '@anditgood',
    avatar: '🍵',
    category: '예술 칼럼',
    gradient: 'linear-gradient(135deg,#9a8fa6,#5f5568)',
    emoji: '🍵',
    title: '느리게 보는 연습',
    body: '한 작품 앞에 3분만 머물러 보세요. 처음엔 지루하다가, 어느 순간 못 보던 결이 보이기 시작해요. 감상은 속도를 늦추는 일에서 시작됩니다.',
    tags: ['에세이', '감상'],
    likes: 1540,
    saves: 1280,
  },
  {
    id: 'f9',
    author: '안디잇굿 에디터',
    handle: '@anditgood',
    avatar: '✏️',
    category: '예술 칼럼',
    gradient: 'linear-gradient(135deg,#8f8aa0,#565068)',
    emoji: '✏️',
    title: '못 그려도 괜찮은 이유',
    body: '잘 그리려는 마음을 잠시 내려놓아요. 서툰 선에는 오늘의 내가 그대로 담겨요. 완성보다 남긴다는 사실이 더 오래 남습니다.',
    tags: ['에세이', '창작'],
    likes: 2010,
    saves: 1590,
  },
  {
    id: 'f10',
    author: '안디잇굿 에디터',
    handle: '@anditgood',
    avatar: '🚶',
    category: '예술 칼럼',
    gradient: 'linear-gradient(135deg,#a596ab,#67586c)',
    emoji: '🚶',
    title: '미술관에서 혼자 보내는 시간',
    body: '누구의 속도에도 맞추지 않아도 되는 시간. 조용한 전시장에서 나에게 말을 걸어 보세요. 예술은 종종 혼자일 때 더 깊어져요.',
    tags: ['에세이', '고요'],
    likes: 1330,
    saves: 1170,
  },
  {
    id: 'f11',
    author: '안디잇굿 에디터',
    handle: '@anditgood',
    avatar: '🌈',
    category: '예술 칼럼',
    gradient: 'linear-gradient(135deg,#9a8fa6,#5f5568)',
    emoji: '🌈',
    title: '좋아하는 색이 말해주는 것',
    body: '오늘 자꾸 눈이 가는 색이 있나요. 취향은 설명보다 먼저 마음을 알아채요. 좋아하는 색을 따라가면 나를 조금 더 알게 됩니다.',
    tags: ['에세이', '취향'],
    likes: 1180,
    saves: 990,
  },
  {
    id: 'f12',
    author: '안디잇굿 에디터',
    handle: '@anditgood',
    avatar: '🌙',
    category: '예술 칼럼',
    gradient: 'linear-gradient(135deg,#8f8aa0,#565068)',
    emoji: '🌙',
    title: '예술은 왜 위로가 될까',
    body: '말이 되지 않는 마음도, 색과 형태 앞에서는 잠시 쉬어 갑니다. 이해받지 못한 감정이 그림 속에서 자리를 얻을 때, 우리는 조금 가벼워져요.',
    tags: ['에세이', '위로'],
    likes: 2240,
    saves: 1980,
  },
  {
    id: 'f13',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood.pick',
    avatar: '🎟️',
    category: '문화예술 정보',
    gradient: 'linear-gradient(135deg,#8ba3a8,#4f6a70)',
    emoji: '🎟️',
    title: '이번 주 조용히 보기 좋은 전시 3',
    body: '평일 오전, 사람 적은 시간에 추천하는 전시를 골랐어요. 상업 광고가 아니라 에디터가 직접 다녀와 선별했습니다.',
    tags: ['전시추천', '선별광고'],
    likes: 940,
    saves: 1720,
    sponsored: true,
  },
  {
    id: 'f14',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood.pick',
    avatar: '🏛️',
    category: '문화예술 정보',
    gradient: 'linear-gradient(135deg,#93aeb0,#566f72)',
    emoji: '🏛️',
    title: '이번 달 무료 전시 5',
    body: '지갑 부담 없이 즐기는 무료 전시를 모았어요. 대기 시간과 동선까지 확인해 두었습니다.',
    tags: ['무료전시', '선별광고'],
    likes: 1120,
    saves: 2380,
    sponsored: true,
  },
  {
    id: 'f15',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood.pick',
    avatar: '🎧',
    category: '문화예술 정보',
    gradient: 'linear-gradient(135deg,#87a09a,#4d645e)',
    emoji: '🎧',
    title: '주말 도슨트 추천',
    body: '작품이 훨씬 깊게 보이는 해설 투어. 이번 주말 신청 가능한 무료 도슨트를 정리했어요.',
    tags: ['도슨트', '주말'],
    likes: 820,
    saves: 1340,
  },
  {
    id: 'f16',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood.pick',
    avatar: '🚌',
    category: '문화예술 정보',
    gradient: 'linear-gradient(135deg,#8ba3a8,#4f6a70)',
    emoji: '🚌',
    title: '소도시 미술관 나들이',
    body: '북적임에서 한 걸음 떨어진, 소도시의 작은 미술관들. 느린 하루를 보내기 좋은 곳을 골랐어요.',
    tags: ['나들이', '선별광고'],
    likes: 760,
    saves: 1010,
    sponsored: true,
  },
  {
    id: 'f17',
    author: '안디잇굿 큐레이션',
    handle: '@anditgood.pick',
    avatar: '💻',
    category: '문화예술 정보',
    gradient: 'linear-gradient(135deg,#93aeb0,#566f72)',
    emoji: '💻',
    title: '집에서 즐기는 온라인 전시',
    body: '밖에 나가기 어려운 날엔 온라인 전시로. 소리를 낮추고 화면을 천천히 넘겨 보세요.',
    tags: ['온라인전시', '집콕'],
    likes: 690,
    saves: 880,
  },
  {
    id: 'f18',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '🌃',
    category: '예술 뉴스',
    gradient: 'linear-gradient(135deg,#a3ab8c,#5f6a4d)',
    emoji: '🌃',
    title: '국립현대미술관 야간 개장 확대',
    body: '주말 저녁까지 관람이 가능해졌어요. 조명 아래에서 보는 작품은 낮과는 또 다른 얼굴을 보여 줍니다.',
    tags: ['소식', '미술관'],
    likes: 620,
    saves: 240,
  },
  {
    id: 'f19',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '🦁',
    category: '예술 뉴스',
    gradient: 'linear-gradient(135deg,#9aa585,#5a6647)',
    emoji: '🦁',
    title: '베니스 비엔날레 개막',
    body: '세계 미술의 축제가 다시 문을 열었어요. 올해 한국관 주제와 화제의 작가들을 짧게 정리했습니다.',
    tags: ['비엔날레', '국제전'],
    likes: 540,
    saves: 300,
  },
  {
    id: 'f20',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '🖼️',
    category: '예술 뉴스',
    gradient: 'linear-gradient(135deg,#adb193,#666b4d)',
    emoji: '🖼️',
    title: '미술관 야간 관람 인기',
    body: '퇴근 후 관람객이 늘고 있어요. 도시가 잠든 시간, 작품과 단둘이 마주하는 경험이 새 트렌드로 자리 잡는 중입니다.',
    tags: ['트렌드', '야간관람'],
    likes: 710,
    saves: 410,
  },
  {
    id: 'f21',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '🌱',
    category: '예술 뉴스',
    gradient: 'linear-gradient(135deg,#a3ab8c,#5f6a4d)',
    emoji: '🌱',
    title: '신진 작가 지원 확대',
    body: '청년·신진 작가를 위한 창작 지원이 늘어나요. 더 다양한 목소리가 전시장에 오를 수 있게 됩니다.',
    tags: ['지원', '신진작가'],
    likes: 480,
    saves: 260,
  },
  {
    id: 'f22',
    author: '컬처 뉴스룸',
    handle: '@culture.news',
    avatar: '📚',
    category: '예술 뉴스',
    gradient: 'linear-gradient(135deg,#9aa585,#5a6647)',
    emoji: '📚',
    title: '도서관 속 미술관 늘어난다',
    body: '동네 도서관에 작은 전시 공간이 생기고 있어요. 책을 빌리러 갔다가 그림 한 점과 마주치는 하루.',
    tags: ['생활문화', '동네'],
    likes: 560,
    saves: 390,
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
  b_calm: { id: 'b_calm', name: '고요한 산책자', emoji: '🍃', desc: '음악·소리 챌린지 완주' },
  b_lens: { id: 'b_lens', name: '보는 눈', emoji: '📷', desc: '사진 챌린지 완주' },
  b_voice: { id: 'b_voice', name: '내 목소리', emoji: '🎤', desc: '목소리 챌린지 완주' },
  b_move: { id: 'b_move', name: '나의 리듬', emoji: '🕺', desc: '움직임 챌린지 완주' },
  b_streak7: { id: 'b_streak7', name: '7일의 리듬', emoji: '🔥', desc: '7일 연속 미션 수행' },
  b_gift1: { id: 'b_gift1', name: '첫 나눔', emoji: '🎁', desc: '첫 기부를 전했어요' },
  b_gift3: { id: 'b_gift3', name: '세 번의 나눔', emoji: '🏆', desc: '세 번의 기부를 전했어요' },
}
