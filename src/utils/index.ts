import dictionary from '@/data/dictionary.json'
import targetWords from '@/data/targetWords.json'
import type { Alphabet } from '@/utils/types'


export const validateWord = (word: Alphabet[]): boolean => dictionary.includes(word.join(''))

export const compareFlatArray = (a: unknown[], b: unknown[]): boolean => a.length === b.length && a.every((v, i) => v === b[i])

export const getSolution = (): string => targetWords[Math.floor(Math.random() * targetWords.length)]

export const numToOrdinal = (num: number): string => {
  const int = Math.round(Math.abs(num)).toString(10)

  if (int.endsWith('1')) return `${int}st`
  if (int.endsWith('2')) return `${int}nd`
  if (int.endsWith('3')) return `${int}rd`
  return `${int}th`
}
