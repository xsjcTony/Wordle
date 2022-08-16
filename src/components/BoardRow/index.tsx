/* eslint-disable react/no-array-index-key */

import BoardLetter from '@/components/BoardLetter'
import { WORD_LENGTH } from '@/constants'
import styles from './index.module.scss'


const BoardRow = (): JSX.Element => (
  <div className={styles.boardRow}>
    {new Array(WORD_LENGTH).fill(void 0).map((_, i) => (
      <div
        key={i}
        className={styles.boardLetterContainer}
        style={{ animationDelay: `.${i}s` }}
      >
        <BoardLetter />
      </div>
    ))}
  </div>
)

export default BoardRow
