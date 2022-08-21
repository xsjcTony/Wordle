import dictionary from '@/data/dictionary.json'
import type { Alphabet } from '@/utils/types'


export const validateWord = (word: Alphabet[]): boolean => dictionary.includes(word.join(''))

export const compareFlatArray = (a: unknown[], b: unknown[]): boolean => a.length === b.length && a.every((v, i) => v === b[i])
