/* eslint-disable @typescript-eslint/brace-style */

import { useUpdateEffect } from 'ahooks'
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { BoardLetterState } from '@/constants'
import { FLIP_IN, FLIP_OUT, POP_IN } from '@/constants/animations'
import styles from './index.module.scss'
import type { Alphabet } from '@/constants'


export interface BoardLetterRef {
  changeState: (state: BoardLetterState, animationDelay?: number) => Promise<void>
}

interface BoardLetterProps {
  letter: Alphabet | undefined
}


const BoardLetter = forwardRef<BoardLetterRef, BoardLetterProps>((
  { letter },
  ref
): JSX.Element => {
  const [letterState, setLetterState] = useState<BoardLetterState>(BoardLetterState.empty)

  const divRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    changeState: async (state: BoardLetterState, animationDelay?: number) => new Promise((resolve) => {
      if (animationDelay !== undefined) resolve()

      setTimeout(async () => {
        const divEl = divRef.current
        if (!divEl) return

        await divEl.animate(FLIP_IN, {
          duration: 250,
          easing: 'ease-in'
        }).finished

        setLetterState(state)

        divEl.animate(FLIP_OUT, {
          duration: 250,
          easing: 'ease-in'
        })

        resolve()
      }, animationDelay)
    })
  }), [])

  useUpdateEffect(() => {
    // insert
    if (letter) {
      setLetterState(BoardLetterState.tbd)

      divRef.current?.animate(POP_IN, 100)
    }
    // remove
    else {
      setLetterState(BoardLetterState.empty)

      // stop any potentially playing animations
      divRef.current?.getAnimations().forEach(animation => void animation.cancel())
    }
  }, [letter])

  return (
    <div
      ref={divRef}
      aria-label="guessed letter"
      aria-roledescription="Display of guessed letter"
      className={styles.boardLetter}
      data-state={letterState}
    >
      {letter}
    </div>
  )
})

BoardLetter.displayName = 'BoardLetter'
export default memo(BoardLetter)
