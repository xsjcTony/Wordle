import { useState } from 'react'
import { BoardLetterState } from '@/constants'
import styles from './index.module.scss'


interface BoardLetterProps {
  letter: string
}


const BoardLetter = ({ letter }: BoardLetterProps): JSX.Element => {
  const [letterState, setLetterState] = useState<BoardLetterState>(BoardLetterState.empty)

  return (
    <div className={styles.boardLetter} data-state={letterState}>
      {letter}
    </div>
  )
}

export default BoardLetter
