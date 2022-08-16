/* eslint-disable react/no-array-index-key */

import { useRef } from 'react'
import BoardLetter from '@/components/BoardLetter'
import { WORD_LENGTH } from '@/constants'
import styles from './index.module.scss'
import type { BoardLetterRef } from '@/components/BoardLetter'


const BoardRow = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const letterRefs = useRef<(BoardLetterRef | null)[]>([])

  return (
    <div className={styles.boardRow}>
      {new Array(WORD_LENGTH).fill(void 0).map((_, i) => (
        <div
          key={i}
          className={styles.boardLetterContainer}
          style={{ '--delay': `.${i}s` }}
        >
          <BoardLetter ref={ref => letterRefs.current[i] = ref} />
        </div>
      ))}
    </div>
  )
}

export default BoardRow
