import create from 'zustand'
import { persist } from 'zustand/middleware'


interface DarkModeState {
  darkMode: boolean
  switchDarkMode: () => void
}


const useDarkMode = create<DarkModeState>()(persist(set => ({
  darkMode: false,
  switchDarkMode: () => void set(state => ({ darkMode: !state.darkMode }))
}), {
  name: 'dark-mode',
  getStorage: () => localStorage
}))

export default useDarkMode
