import BoardLetter from '@/components/BoardLetter'
import { WORD_LENGTH } from '@/constants'
import styles from './index.module.scss'


const BoardRow = (): JSX.Element => (
  <div className={styles.boardRow}>
    {new Array(WORD_LENGTH).fill(void 0).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className={styles.boardLetterContainer}>
        <BoardLetter letter="a" />
      </div>
    ))}
  </div>
)

export default BoardRow
