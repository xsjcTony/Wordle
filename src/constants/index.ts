// Keyboard
export const FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as const
export const SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as const
export const THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] as const

// Game
export const GUESS_CHANCE = 6
export const WORD_LENGTH = 5

export const enum KeyboardLetterState {
  absent = 'absent',
  present = 'present',
  correct = 'correct'
}

export const enum BoardLetterState {
  absent = 'absent',
  present = 'present',
  correct = 'correct',
  empty = 'empty',
  tbd = 'tbd'
}


// Alphabet
export type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

export const isAlphabet = (letter: string): letter is Alphabet => ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].includes(letter)
