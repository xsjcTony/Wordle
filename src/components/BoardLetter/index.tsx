import { useState } from 'react'
import { BoardLetterState } from '@/constants'
import styles from './index.module.scss'


const enum AnimationState {
  idle = 'idle',
  pop = 'pop',
  flipIn = 'flip-in',
  flipOut = 'flip-out'
}


const BoardLetter = (): JSX.Element => {
  const [letterState, setLetterState] = useState<BoardLetterState>(BoardLetterState.empty)
  const [animation, setAnimation] = useState<AnimationState>(AnimationState.idle)

  return (
    <div
      className={styles.boardLetter}
      data-animation={animation}
      data-state={letterState}
    />
  )
}

export default BoardLetter
