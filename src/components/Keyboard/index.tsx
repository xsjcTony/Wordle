import { ReactComponent as Backspace } from '@/assets/images/backspace.svg'
import Key from '@/components/Key'
import { FIRST_ROW, SECOND_ROW, THIRD_ROW } from '@/constants'
import useGameState from '@/store/useGameState'
import styles from './index.module.scss'


const Keyboard = (): JSX.Element => {
  const { removeLetter, startEvaluating } = useGameState(({ removeLetter, startEvaluating }) => ({ removeLetter, startEvaluating }))

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>
        {FIRST_ROW.map(letter => <Key key={letter} text={letter} />)}
      </div>
      <div className={styles.keyboardRow}>
        <div className={styles.keyboardSpace} />
        {SECOND_ROW.map(letter => <Key key={letter} text={letter} />)}
        <div className={styles.keyboardSpace} />
      </div>
      <div className={styles.keyboardRow}>
        <Key wide text="enter" onClick={startEvaluating} />
        {THIRD_ROW.map(letter => <Key key={letter} text={letter} />)}
        <Key wide text={<Backspace />} onClick={removeLetter} />
      </div>
    </div>
  )
}

export default Keyboard
