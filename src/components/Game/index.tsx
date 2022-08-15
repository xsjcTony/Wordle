import useInput from '@/store/useInput'
import styles from './index.module.scss'


export const enum LetterState {
  absent = 'absent',
  present = 'present',
  correct = 'correct'
}


const Game = (): JSX.Element => {
  const input = useInput(s => s.input)

  return (
    <div className={styles.game}>
      <input readOnly type="text" value={input} />
    </div>
  )
}

export default Game
