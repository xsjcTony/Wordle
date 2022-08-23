import { toast } from 'react-toastify'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BoardLetterState, GameStatus, GUESS_CHANCE, WORD_LENGTH } from '@/constants'
import { getSolution } from '@/utils'
import type { Alphabet, Tuple } from '@/utils/types'


/**
 * Types
 */
type BoardState = Tuple<string, typeof GUESS_CHANCE>

export type EvaluationResult = Tuple<BoardLetterState, typeof WORD_LENGTH>

type Evaluations = Tuple<EvaluationResult, typeof GUESS_CHANCE>

interface GameStateData {
  gameStatus: GameStatus
  solution: string
  boardState: BoardState
  evaluations: Evaluations
  currentRowIndex: number
  currentWord: Alphabet[]
  evaluating: boolean
  hardMode: boolean
}

interface GameStateAction {
  setEvaluationResult: (word: Alphabet[], result: EvaluationResult) => void
  setGameStatus: (status: GameStatus) => void
  restartGame: () => void
  insertLetter: (letter: Alphabet) => void
  removeLetter: () => void
  startEvaluating: () => void
  stopEvaluating: () => void
  switchHardMode: () => void
}

type GameState = GameStateAction & GameStateData


/**
 * Initial state
 */
const initialState = (hardMode = false): GameStateData => ({
  gameStatus: GameStatus.inProgress,
  solution: getSolution(),
  boardState: new Array<string>(GUESS_CHANCE).fill('') as BoardState,
  evaluations: new Array(GUESS_CHANCE).fill([]) as Evaluations,
  currentRowIndex: 0,
  currentWord: [],
  evaluating: false,
  hardMode
})


/**
 * Store
 */
const useGameState = create<GameState>()(persist(immer((set, get) => ({
  ...initialState(),
  setEvaluationResult: (word: Alphabet[], result: EvaluationResult) => {
    set((state) => {
      state.boardState[state.currentRowIndex] = word.join('')
      state.evaluations[state.currentRowIndex] = result
      state.currentRowIndex += 1
      state.currentWord = []
      state.evaluating = false
    })
  },
  setGameStatus: (status: GameStatus) => void set({ gameStatus: status }),
  restartGame: () => {
    toast.dismiss()
    set(state => ({ ...initialState(state.hardMode), solution: getSolution() }))
  },
  insertLetter: (letter: Alphabet) => void set((state) => {
    if (state.currentWord.length !== 5) {
      state.currentWord.push(letter)
    }
  }),
  removeLetter: () => void set((state) => {
    if (state.currentWord.length !== 0) {
      state.currentWord.pop()
    }
  }),
  startEvaluating: () => void set({ evaluating: true }),
  stopEvaluating: () => void set({ evaluating: false }),
  switchHardMode: () => {
    // disable hard mode
    if (get().hardMode) {
      toast('Hard mode disabled')
      set({ hardMode: false })
      return
    }

    // enable hard mode
    if (get().gameStatus !== GameStatus.inProgress || get().currentRowIndex === 0) {
      toast('Hard mode enabled')
      set({ hardMode: true })
    } else {
      toast('Hard mode can only be enabled at the start of a round')
    }
  }
})), {
  name: 'game-state',
  getStorage: () => localStorage,
  partialize: (state) => {
    const { gameStatus, solution, boardState, evaluations, currentRowIndex, hardMode } = state

    return {
      gameStatus,
      solution,
      boardState,
      evaluations,
      currentRowIndex,
      hardMode
    }
  }
}))

export default useGameState
