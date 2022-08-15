import Board from '@/components/Board'
import Header from '@/components/Header'
import Keyboard from '@/components/Keyboard'
import styles from './App.module.scss'


const App = (): JSX.Element => (
  <>
    <Header />
    <main className={styles.main}>
      <Board />
      <Keyboard />
    </main>
  </>
)


export default App
