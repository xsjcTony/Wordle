import dictionary from '@/data/dictionary.json'
import targetWords from '@/data/targetWords.json'
import type { Alphabet } from '@/utils/types'


export const validateWord = (word: Alphabet[]): boolean => dictionary.includes(word.join(''))

export const compareFlatArray = (a: unknown[], b: unknown[]): boolean => a.length === b.length && a.every((v, i) => v === b[i])

export const getSolution = (): string => targetWords[Math.floor(Math.random() * targetWords.length)]

export const numToOrdinal = (num: number): string => {
  const indicators = ['th', 'st', 'nd', 'rd']
  const int = Math.round(Math.abs(num))
  const tens = int % 100

  return `${int}${indicators[tens > 10 && tens < 20 ? 0 : tens % 10] ?? indicators[0]}`
}
