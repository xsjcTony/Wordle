import { useEffect } from 'react'
import { cssTransition, ToastContainer } from 'react-toastify'
import Board from '@/components/Board'
import Header from '@/components/Header'
import Keyboard from '@/components/Keyboard'
import useDarkMode from '@/store/useDarkMode'
import styles from './App.module.scss'


const Fade = cssTransition({
  enter: 'no-animation',
  exit: 'fade-out',
  collapse: false
})


const App = (): JSX.Element => {
  const darkMode = useDarkMode(s => s.darkMode)

  useEffect(() => {
    document.querySelector('html')?.classList.toggle('dark', darkMode)
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
        newestOnTop
        autoClose={1500}
        bodyClassName={styles.toastBody}
        className={styles.toastContainer}
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-center"
        theme={darkMode ? 'light' : 'dark'}
        toastClassName={styles.toast}
        transition={Fade}
      />
    </>
  )
}


export default App
