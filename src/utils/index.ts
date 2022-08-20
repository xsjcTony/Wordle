import dictionary from '@/data/dictionary.json'
import type { Alphabet } from '@/utils/types'


export const validateWord = (word: Alphabet[]): boolean => dictionary.includes(word.join(''))
