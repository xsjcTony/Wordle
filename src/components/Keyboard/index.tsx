import { ReactComponent as Backspace } from '@/assets/images/backspace.svg'
import Key from '@/components/Key'
import useInput from '@/store/useInput'
import styles from './index.module.scss'


const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm']


const Keyboard = (): JSX.Element => {
  const pop = useInput(s => s.pop)

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>
        {firstRow.map(letter => <Key key={letter} text={letter} />)}
      </div>
      <div className={styles.keyboardRow}>
        <div className={styles.keyboardSpace} />
        {secondRow.map(letter => <Key key={letter} text={letter} />)}
        <div className={styles.keyboardSpace} />
      </div>
      <div className={styles.keyboardRow}>
        <Key wide text="enter" />
        {thirdRow.map(letter => <Key key={letter} text={letter} />)}
        <Key wide text={<Backspace />} onClick={pop} />
      </div>
    </div>
  )
}

export default Keyboard
