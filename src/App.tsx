import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Board from '@/components/Board'
import Header from '@/components/Header'
import Keyboard from '@/components/Keyboard'
import useDarkMode from '@/store/useDarkMode'
import styles from './App.module.scss'


const App = (): JSX.Element => {
  const darkMode = useDarkMode(s => s.darkMode)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Board />
        <Keyboard />
      </main>
      <ToastContainer
        hideProgressBar
        pauseOnFocusLoss  // TODO: change
        autoClose={1500}
        bodyClassName={styles.toastBody}
        // transition={null}
        closeButton={false}
        closeOnClick={false}
        pauseOnHover={false}
        position="top-center"
        theme={darkMode ? 'light' : 'dark'}
        toastClassName={styles.toast}
      />
    </>
  )
}


export default App
