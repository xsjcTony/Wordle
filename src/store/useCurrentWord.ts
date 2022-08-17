import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Alphabet } from '@/constants'


/**
 * Types
 */
interface CurrentWordStateData {
  currentWord: Alphabet[]
  currentLetterIndex: number
  evaluating: boolean
}

interface CurrentWordStateAction {
  insertLetter: (letter: Alphabet) => void
  removeLetter: () => void
  startEvaluating: () => void
  resetWord: () => void
}

type CurrentWordState = CurrentWordStateAction & CurrentWordStateData


/**
 * Initial state
 */
const initialState: CurrentWordStateData = {
  currentWord: [],
  currentLetterIndex: 0,
  evaluating: false
}


/**
 * Store
 */
const useCurrentWord = create<CurrentWordState>()(immer(set => ({
  ...initialState,
  insertLetter: (letter: Alphabet) => void set((state) => {
    state.currentWord.push(letter)
    state.currentLetterIndex += 1
  }),
  removeLetter: () => void set((state) => {
    state.currentWord.pop()
    state.currentLetterIndex -= 1
  }),
  startEvaluating: () => void set({ evaluating: true }),
  resetWord: () => void set({ ...initialState })
})))

export default useCurrentWord
