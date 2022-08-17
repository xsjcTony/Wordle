import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BoardLetterState, GameStatus, GUESS_CHANCE } from '@/constants'


/**
 * Types
 */
interface GameStateData {
  gameStatus: GameStatus
  solution: string
  boardState: string[]
  evaluations: BoardLetterState[][]
  currentRowIndex: number
}

interface GameStateAction {
  evaluate: (word: string, result: BoardLetterState[]) => void
  setGameStatus: (status: GameStatus) => void
  resetState: () => void
}

type GameState = GameStateAction & GameStateData


/**
 * Initial state
 */
const initialState: GameStateData = {
  gameStatus: GameStatus.inProgress,
  solution: '',
  boardState: new Array(GUESS_CHANCE).fill(''),
  evaluations: new Array(GUESS_CHANCE).fill([]),
  currentRowIndex: 0
}


/**
 * Store
 */
const useGameState = create<GameState>()(persist(immer(set => ({
  ...initialState,
  evaluate: (word: string, result: BoardLetterState[]) => {
    set((state) => {
      state.boardState[state.currentRowIndex] = word
      state.evaluations[state.currentRowIndex] = result
      state.currentRowIndex += 1
    })
  },
  setGameStatus: (status: GameStatus) => void set({ gameStatus: status }),
  resetState: () => void set({ ...initialState, solution: '' }) // TODO: change solution to generator
})), {
  name: 'game-state',
  getStorage: () => localStorage,
  partialize: (state) => {
    const { gameStatus, solution, boardState, evaluations, currentRowIndex } = state

    return {
      gameStatus,
      solution,
      boardState,
      evaluations,
      currentRowIndex
    }
  }
}))

export default useGameState
