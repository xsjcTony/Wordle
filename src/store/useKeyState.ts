import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { KeyboardLetterState } from '@/constants'
import type { Alphabet } from '@/utils/types'


interface KeyState {
  keyStateMap: Partial<Record<Alphabet, KeyboardLetterState>>
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => void
  resetKeyMap: () => void
}


const useKeyState = create<KeyState>()(immer(set => ({
  keyStateMap: {},
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => {
    set((s) => {
      switch (s.keyStateMap[key]) {
        case void 0:
        case KeyboardLetterState.absent:
          s.keyStateMap[key] = state
          return
        case KeyboardLetterState.present:
        case KeyboardLetterState.correct:
          if (state === KeyboardLetterState.correct) {
            s.keyStateMap[key] = state
          }
          return
      }
    })
  },
  resetKeyMap: () => void set({ keyStateMap: {} })
})))

export default useKeyState
