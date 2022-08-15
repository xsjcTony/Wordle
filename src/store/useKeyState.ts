import create from 'zustand'
import { KeyboardLetterState } from '@/constants'
import type { Alphabet } from '@/constants'


interface KeyState {
  keyStateMap: Partial<Record<Alphabet, KeyboardLetterState>>
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => void
}


const useKeyState = create<KeyState>()(set => ({
  keyStateMap: {},
  setKeyState: (key: Alphabet, state: KeyboardLetterState) => void set(s => ({ keyStateMap: { ...s.keyStateMap, [key]: state } }))
}))

export default useKeyState
