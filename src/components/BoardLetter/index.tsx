import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { BoardLetterState } from '@/constants'
import { FLIP_IN, FLIP_OUT, POP_IN } from '@/constants/animations'
import styles from './index.module.scss'
import type { Alphabet } from '@/constants'


export interface BoardLetterRef {
  changeState: (state: BoardLetterState) => Promise<void>
  insertLetter: (letter: Alphabet) => void
  removeLetter: () => void
}


const BoardLetter = forwardRef<BoardLetterRef>((_, ref): JSX.Element => {
  const [letterState, setLetterState] = useState<BoardLetterState>(BoardLetterState.empty)

  const divRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    changeState: async (state: BoardLetterState) => {
      const divEl = divRef.current
      if (!divEl) return

      const flipIn = divEl.animate(FLIP_IN, {
        duration: 250,
        easing: 'ease-in'
      })
      await flipIn.finished

      setLetterState(state)

      divEl.animate(FLIP_OUT, {
        duration: 250,
        easing: 'ease-in'
      })
    },

    insertLetter: (letter: Alphabet) => {
      const divEl = divRef.current
      if (!divEl) return

      divEl.innerText = letter
      setLetterState(BoardLetterState.tbd)

      divEl.animate(POP_IN, 100)
    },

    removeLetter: () => {
      const divEl = divRef.current
      if (!divEl) return

      divEl.innerText = ''
      setLetterState(BoardLetterState.empty)

      // stop any potentially playing animations
      divEl.getAnimations().forEach(animation => void animation.cancel())
    }
  }), [])

  return (
    <div
      ref={divRef}
      aria-label="guessed letter"
      aria-roledescription="Display of guessed letter"
      className={styles.boardLetter}
      data-state={letterState}
    />
  )
})

BoardLetter.displayName = 'BoardLetter'
export default BoardLetter
