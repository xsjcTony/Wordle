import dictionary from '@/data/dictionary.json'
import targetWords from '@/data/targetWords.json'
import type { Alphabet } from '@/utils/types'


export const validateWord = (word: Alphabet[]): boolean => dictionary.includes(word.join(''))

export const compareFlatArray = (a: unknown[], b: unknown[]): boolean => a.length === b.length && a.every((v, i) => v === b[i])

export const getSolution = (): string => targetWords[Math.floor(Math.random() * targetWords.length)]

export const num1To5ToOrdinal = (n: 1 | 2 | 3 | 4 | 5): string =>
  n === 1
    ? '1st'
    : n === 2
      ? '2nd'
      : n === 3
        ? '3rd'
        : n === 4
          ? '4th'
          : '5th'
