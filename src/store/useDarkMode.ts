import create from 'zustand'
import { persist } from 'zustand/middleware'


interface DarkModeState {
  darkMode: boolean
  switchDarkMode: () => void
}


const useDarkMode = create<DarkModeState>()(persist((set, get) => ({
  darkMode: false,
  switchDarkMode: () => {
    set(state => ({ darkMode: !state.darkMode }))
    document.documentElement.classList.toggle('dark', get().darkMode)
  }
}), {
  name: 'dark-mode',
  getStorage: () => localStorage
}))

export default useDarkMode
