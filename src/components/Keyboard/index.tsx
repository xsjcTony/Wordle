import styles from './index.module.scss'


const Keyboard = (): JSX.Element => {
  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>1</div>
      <div className={styles.keyboardRow}>2</div>
      <div className={styles.keyboardRow}>3</div>
    </div>
  )
}

export default Keyboard
