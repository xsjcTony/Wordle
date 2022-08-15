import create from 'zustand'


interface InputState {
  input: string
  push: (char: string) => void
  pop: () => void
}


const useInput = create<InputState>()((set) => {
  return {
    input: '',
    push: (char: string) => void set((state) => {
      return { input: state.input + char }
    }),
    pop: () => void set((state) => {
      return { input: state.input.slice(0, -1) }
    })
  }
})

export default useInput
