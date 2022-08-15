import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { KeyboardLetterState } from '@/constants'
import type { Alphabet } from '@/constants'


interface KeyState {
  keyStateMap: Partial<Record<Alphabet, KeyboardLetterState>>
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => void
}


const useKeyState = create<KeyState>()(immer(set => ({
  keyStateMap: {},
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => void set(s => void (s.keyStateMap[key] = state))
})))

export default useKeyState
