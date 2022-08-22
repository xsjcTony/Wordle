import { toast } from 'react-toastify'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BoardLetterState, GameStatus, GUESS_CHANCE, WORD_LENGTH } from '@/constants'
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
}

interface GameStateAction {
  setEvaluationResult: (word: Alphabet[], result: EvaluationResult) => void
  setGameStatus: (status: GameStatus) => void
  restartGame: () => void
  insertLetter: (letter: Alphabet) => void
  removeLetter: () => void
  startEvaluating: () => void
  stopEvaluating: () => void
}

type GameState = GameStateAction & GameStateData


/**
 * Initial state
 */
const initialState: GameStateData = {
  gameStatus: GameStatus.inProgress,
  solution: 'humid', // TODO: change solution to generator
  boardState: new Array<string>(GUESS_CHANCE).fill('') as BoardState,
  evaluations: new Array(GUESS_CHANCE).fill([]) as Evaluations,
  currentRowIndex: 0,
  currentWord: [],
  evaluating: false
}


/**
 * Store
 */
const useGameState = create<GameState>()(persist(immer(set => ({
  ...initialState,
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
    set({ ...initialState, solution: 'humid' })
  }, // TODO: change solution to generator
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
  stopEvaluating: () => void set({ evaluating: false })
})), {
  name: 'game-state',
  getStorage: () => localStorage,
  partialize: (state) => {
    const { gameStatus, solution, boardState, evaluations, currentRowIndex, currentWord } = state

    return {
      gameStatus,
      solution,
      boardState,
      evaluations,
      currentRowIndex,
      currentWord // For resetting the game after page reloads
    }
  }
}))

export default useGameState
