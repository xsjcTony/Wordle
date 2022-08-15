// Keyboard
export const FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
export const SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
export const THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

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
