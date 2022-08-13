import { ReactComponent as Backspace } from '@/assets/images/backspace.svg'
import Key from '@/components/Key'
import styles from './index.module.scss'


const Keyboard = (): JSX.Element => (
  <div className={styles.keyboard}>
    <div className={styles.keyboardRow}>
      <Key keyText="q" />
      <Key keyText="w" />
      <Key keyText="e" />
      <Key keyText="r" />
      <Key keyText="t" />
      <Key keyText="y" />
      <Key keyText="u" />
      <Key keyText="i" />
      <Key keyText="o" />
      <Key keyText="p" />
    </div>
    <div className={styles.keyboardRow}>
      <div className={styles.keyboardSpace} />
      <Key keyText="a" />
      <Key keyText="s" />
      <Key keyText="d" />
      <Key keyText="f" />
      <Key keyText="g" />
      <Key keyText="h" />
      <Key keyText="j" />
      <Key keyText="k" />
      <Key keyText="l" />
      <div className={styles.keyboardSpace} />
    </div>
    <div className={styles.keyboardRow}>
      <Key wide keyText="enter" />
      <Key keyText="z" />
      <Key keyText="x" />
      <Key keyText="c" />
      <Key keyText="v" />
      <Key keyText="b" />
      <Key keyText="n" />
      <Key keyText="m" />
      <Key wide keyText={<Backspace />} />
    </div>
  </div>
)

export default Keyboard
