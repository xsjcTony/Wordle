import { useCallback, useEffect } from 'react'
import { GameStatus } from '@/constants'
import useGameState from '@/store/useGameState'
import { isAlphabet } from '@/utils/types'


const useKeyboard = (): void => {
  const {
    gameStatus,
    evaluating,
    insertLetter,
    removeLetter,
    startEvaluating
  } = useGameState(
    ({ gameStatus, evaluating, insertLetter, removeLetter, startEvaluating }) =>
      ({ gameStatus, evaluating, insertLetter, removeLetter, startEvaluating })
  )

  const keyDownListener = useCallback((event: KeyboardEvent) => {
    if (gameStatus !== GameStatus.inProgress || evaluating) return

    const { key } = event

    if (isAlphabet(key)) {
      insertLetter(key)
    } else if (key.toLowerCase() === 'backspace') {
      removeLetter()
    } else if (key.toLowerCase() === 'enter') {
      startEvaluating()
    }
  }, [evaluating, gameStatus])

  useEffect(() => {
    document.addEventListener('keydown', keyDownListener)

    return () => void document.removeEventListener('keydown', keyDownListener)
  }, [keyDownListener])
}

export default useKeyboard
