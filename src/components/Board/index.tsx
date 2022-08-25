import BoardRow from '@/components/BoardRow'
import { GUESS_CHANCE } from '@/constants'
import styles from './index.module.scss'


const Board = (): JSX.Element => (
  <div aria-label="game board" className={styles.board}>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {new Array(GUESS_CHANCE).fill(void 0).map((_, i) => <BoardRow key={i} rowIndex={i} />)}
  </div>
)

export default Board
