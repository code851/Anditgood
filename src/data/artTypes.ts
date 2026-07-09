// 예술 성향 진단 — 무신사 옷 타입 테스트처럼 4가지 페르소나로 분류
// 두 축의 조합: 감상(Absorb) ↔ 표현(Express), 감성(Feel) ↔ 탐구(Think)

export type AxisA = 'absorb' | 'express'
export type AxisB = 'feel' | 'think'
export type ArtTypeId = 'dreamer' | 'curator' | 'maker' | 'explorer'

export interface ArtType {
  id: ArtTypeId
  code: string
  name: string
  tagline: string
  emoji: string
  color: string
  soft: string
  keywords: string[]
  description: string
  recommend: string[] // 추천 챌린지 태그
  starterGoal: string
}

export const ART_TYPES: Record<ArtTypeId, ArtType> = {
  dreamer: {
    id: 'dreamer',
    code: 'AF',
    name: '몽상가',
    tagline: '느끼는 대로 스며드는 사람',
    emoji: '🌙',
    color: '#7b5769',
    soft: '#efe1e9',
    keywords: ['감성 감상', '분위기', '몰입'],
    description:
      '작품 앞에서 설명보다 감정이 먼저 오는 타입이에요. 색과 빛, 음악의 여운을 오래 품습니다. 잔잔한 감상과 나만의 해석 기록이 잘 맞아요.',
    recommend: ['감상', '사유', '음악'],
    starterGoal: '일주일에 3번, 마음에 남은 작품을 한 문장으로 남기기',
  },
  curator: {
    id: 'curator',
    code: 'AT',
    name: '큐레이터',
    tagline: '고르고 엮어 나누는 사람',
    emoji: '🗂️',
    color: '#b58b3c',
    soft: '#f1e6cd',
    keywords: ['수집', '지식', '큐레이션'],
    description:
      '좋은 것을 발견하고 맥락으로 엮어 남과 나누는 즐거움을 아는 타입이에요. 아카이브가 쌓일수록 힘이 납니다. 예술 상식과 전시 정보에 강해요.',
    recommend: ['지식', '전시', '아카이브'],
    starterGoal: '한 달간 나만의 취향 컬렉션 20개 모으기',
  },
  maker: {
    id: 'maker',
    code: 'EF',
    name: '창작자',
    tagline: '직접 만들며 표현하는 사람',
    emoji: '🎨',
    color: '#c8613b',
    soft: '#f0d9cd',
    keywords: ['표현', '창작', '실험'],
    description:
      '보는 것에서 그치지 않고 손을 움직여야 직성이 풀리는 타입이에요. 서툴러도 완성하는 경험에서 성장합니다. 드로잉·글쓰기·사진 챌린지가 어울려요.',
    recommend: ['창작', '드로잉', '사진'],
    starterGoal: '2주 동안 매일 5분씩 무엇이든 만들어 올리기',
  },
  explorer: {
    id: 'explorer',
    code: 'ET',
    name: '탐험가',
    tagline: '경험하며 넓혀가는 사람',
    emoji: '🧭',
    color: '#6f7a5a',
    soft: '#e4e8d8',
    keywords: ['경험', '탐구', '현장'],
    description:
      '새로운 장르와 공간으로 직접 나가는 타입이에요. 낯선 경험을 통해 세계를 넓힙니다. 전시 방문·장르 탐방 챌린지에서 에너지를 얻어요.',
    recommend: ['전시', '경험', '탐방'],
    starterGoal: '한 달간 안 가본 전시·공연 4곳 다녀오기',
  },
}

export interface QuizOption {
  label: string
  a?: AxisA
  b?: AxisB
}

export interface QuizQuestion {
  q: string
  options: QuizOption[]
}

export const QUIZ: QuizQuestion[] = [
  {
    q: '주말 오후, 마음이 가장 끌리는 계획은?',
    options: [
      { label: '조용한 전시장에서 작품 앞에 오래 머물기', a: 'absorb', b: 'feel' },
      { label: '작은 원데이 드로잉 클래스에서 직접 그려보기', a: 'express', b: 'feel' },
      { label: '새로 생긴 복합문화공간을 발로 탐방하기', a: 'absorb', b: 'think' },
      { label: '좋아하는 작가의 자료를 모아 정리하기', a: 'absorb', b: 'think' },
    ],
  },
  {
    q: '좋은 작품을 만났을 때 나는?',
    options: [
      { label: '먼저 감정과 여운에 잠긴다', b: 'feel' },
      { label: '작가와 배경, 기법이 궁금해진다', b: 'think' },
    ],
  },
  {
    q: '예술을 즐기는 방식에 더 가까운 것은?',
    options: [
      { label: '보고 듣고 스며드는 감상', a: 'absorb' },
      { label: '직접 만들고 표현하는 창작', a: 'express' },
    ],
  },
  {
    q: 'SNS에 올린다면 어떤 게시물이 나다운가?',
    options: [
      { label: '내가 찍거나 그린 작업물', a: 'express', b: 'feel' },
      { label: '전시 후기와 별점, 정보 정리', a: 'absorb', b: 'think' },
      { label: '오늘 마음을 울린 문장·장면', a: 'absorb', b: 'feel' },
      { label: '숨은 명작·공간 추천 리스트', a: 'absorb', b: 'think' },
    ],
  },
  {
    q: '새 취미를 시작할 때 나는?',
    options: [
      { label: '일단 재료부터 사서 만들어본다', a: 'express' },
      { label: '자료를 찾아 배경지식부터 쌓는다', a: 'absorb', b: 'think' },
    ],
  },
  {
    q: '예술로 이루고 싶은 것에 가까운 문장은?',
    options: [
      { label: '팍팍한 일상에 감성의 여백을 만들고 싶다', b: 'feel' },
      { label: '아는 만큼 보이는 세계를 넓히고 싶다', b: 'think' },
    ],
  },
]

export function scoreQuiz(answers: QuizOption[]): ArtTypeId {
  let absorb = 0
  let express = 0
  let feel = 0
  let think = 0
  for (const o of answers) {
    if (o.a === 'absorb') absorb++
    if (o.a === 'express') express++
    if (o.b === 'feel') feel++
    if (o.b === 'think') think++
  }
  const axA: AxisA = express > absorb ? 'express' : 'absorb'
  const axB: AxisB = think > feel ? 'think' : 'feel'
  if (axA === 'absorb' && axB === 'feel') return 'dreamer'
  if (axA === 'absorb' && axB === 'think') return 'curator'
  if (axA === 'express' && axB === 'feel') return 'maker'
  return 'explorer'
}
