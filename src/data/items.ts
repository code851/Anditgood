// 캐릭터에 장착하는 아이템 — 각 챌린지를 완주(해당 뱃지 획득)하면 잠금 해제된다.
export interface CharItem {
  id: string
  name: string
  icon: string // 아이템 박스에 보일 이모지
  unlockBadge: string // 이 뱃지를 얻어야 잠금 해제
  from: string // 어느 챌린지에서 얻는지
}

export const ITEMS: CharItem[] = [
  { id: 'beret', name: '베레모', icon: '🎨', unlockBadge: 'b_word', from: '하루 한 작품, 한 문장' },
  { id: 'brush', name: '붓', icon: '🖌️', unlockBadge: 'b_hand', from: '5분 낙서 드로잉' },
  { id: 'cap', name: '나들이 캡', icon: '🧢', unlockBadge: 'b_step', from: '이번 달 전시 한 곳' },
  { id: 'glasses', name: '동그란 안경', icon: '👓', unlockBadge: 'b_eye', from: '주 3회 예술 상식' },
  { id: 'headset', name: '헤드셋', icon: '🎧', unlockBadge: 'b_calm', from: '저자극 사운드 산책' },
  { id: 'crown', name: '반짝 왕관', icon: '👑', unlockBadge: 'b_streak7', from: '7일 연속 미션 수행' },
]
