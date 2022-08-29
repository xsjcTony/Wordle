import { useBoolean, useLocalStorageState, useMount } from 'ahooks'
import clsx from 'clsx'
import { useCallback } from 'react'
import { ReactComponent as Moon } from '@/assets/images/moon.svg'
import { ReactComponent as QuestionMark } from '@/assets/images/question-mark.svg'
import { ReactComponent as Reset } from '@/assets/images/reset.svg'
import { ReactComponent as Sun } from '@/assets/images/sun.svg'
import wordleLogo from '@/assets/images/wordle.ico'
import aelitaLogo from '/favicon.png'
import InstructionModal from '@/components/InstructionModal'
import { GameStatus } from '@/constants'
import useDarkMode from '@/store/useDarkMode'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import styles from './index.module.scss'


const Header = (): JSX.Element => {
  const { darkMode, switchDarkMode } = useDarkMode(
    ({ darkMode, switchDarkMode }) => ({ darkMode, switchDarkMode })
  )
  const { gameStatus, restartGame, hardMode, switchHardMode } = useGameState(
    ({ gameStatus, restartGame, hardMode, switchHardMode }) => ({ gameStatus, restartGame, hardMode, switchHardMode })
  )
  const resetKeyMap = useKeyState(s => s.resetKeyMap)

  const resetGame = useCallback(() => {
    resetKeyMap()
    restartGame()
  }, [resetKeyMap, restartGame])


  // Modal
  const [
    instructionModalVisible,
    {
      setTrue: openInstructionModal,
      setFalse: closeInstructionModal
    }
  ] = useBoolean(false)


  // Show instruction modal if play for first time
  const [learned, setLearned] = useLocalStorageState<boolean>('learned', { defaultValue: false })

  useMount(() => {
    if (!learned) {
      openInstructionModal()
      setLearned(true)
    }
  })


  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <a
            href="https://github.com/xsjcTony"
            rel="noreferrer"
            role="link"
            target="_blank"
            title="Aelita's github page"
          >
            <img alt="Aelita's logo" className={styles.logo} src={aelitaLogo} />
          </a>
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            rel="noreferrer"
            role="link"
            target="_blank"
            title="Wordle's official site"
          >
            <img alt="Wordle's logo" className={styles.logo} src={wordleLogo} />
          </a>
        </div>
        <h1 className={styles.title}>
          <span aria-label="title">
            <p className={styles.sub}>Aelita&apos;s</p>
            <p>Wordle</p>
          </span>
        </h1>
        <div className={styles.headerRight}>
          <Reset
            aria-label="start a new round"
            className={clsx(styles.reset, gameStatus !== GameStatus.inProgress && styles.show)}
            role="button"
            onClick={resetGame}
          />
          <span
            className={styles.hardMode}
            role="button"
            title={`Turn hard mode ${hardMode ? 'off' : 'on'}`}
            onClick={switchHardMode}
          >
            {hardMode ? 'H' : 'E'}
          </span>
          <QuestionMark
            aria-label="how to play"
            role="button"
            onClick={openInstructionModal}
          />
          {darkMode
            ? (
              <Moon
                aria-label="switch off dark mode"
                role="button"
                onClick={switchDarkMode}
              />
            )
            : (
              <Sun
                aria-label="switch on dark mode"
                role="button"
                onClick={switchDarkMode}
              />
            )}
        </div>
      </header>
      <InstructionModal closeModalHandler={closeInstructionModal} isOpen={instructionModalVisible} />
    </>
  )
}

export default Header
