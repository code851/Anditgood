// 투자 단위 — 사용자가 원하는 단어로 바꿀 수 있고, 단어에 따라 그림(이모지)이 달라진다.
export interface CurrencyPreset {
  word: string
  emoji: string
}

export const CURRENCY_PRESETS: CurrencyPreset[] = [
  { word: '열매', emoji: '🌰' },
  { word: '경험', emoji: '🧭' },
  { word: '가치', emoji: '💎' },
  { word: '영감', emoji: '💡' },
  { word: '응원', emoji: '💌' },
  { word: '씨앗', emoji: '🌱' },
  { word: '마음', emoji: '💗' },
  { word: '별', emoji: '⭐' },
]

export function currencyEmoji(word: string): string {
  const found = CURRENCY_PRESETS.find((p) => p.word === word)
  return found ? found.emoji : '✦'
}
