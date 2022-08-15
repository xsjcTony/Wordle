import BoardLetter from '@/components/BoardLetter'
import { WORD_LENGTH } from '@/constants'
import styles from './index.module.scss'


const BoardRow = (): JSX.Element => {
  return (
    <div className={styles.boardRow}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {new Array(WORD_LENGTH).fill(void 0).map((_, i) => <BoardLetter key={i} letter="a" />)}
    </div>
  )
}

export default BoardRow
