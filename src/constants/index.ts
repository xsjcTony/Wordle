// Keyboard
export const FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'] as const
export const SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'] as const
export const THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm'] as const

// Game
export const GUESS_CHANCE = 6 as const
export const WORD_LENGTH = 5 as const

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

export const enum GameStatus {
  inProgress = 'IN_PROGRESS',
  win = 'WIN',
  fail = 'FAIL'
}
