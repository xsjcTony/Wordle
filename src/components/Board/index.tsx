import BoardRow from '@/components/BoardRow'
import { GUESS_CHANCE } from '@/constants'
import styles from './index.module.scss'


export const enum LetterState {
  absent = 'absent',
  present = 'present',
  correct = 'correct'
}


const Board = (): JSX.Element => (
  <div className={styles.board}>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {new Array(GUESS_CHANCE).fill(void 0).map((_, i) => <BoardRow key={i} />)}
  </div>
)

export default Board
