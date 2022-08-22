/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

import { useAsyncEffect, useMount } from 'ahooks'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import BoardLetter from '@/components/BoardLetter'
import { BoardLetterState, GameStatus, GUESS_CHANCE, winPrompt, WORD_LENGTH } from '@/constants'
import { SHAKE } from '@/constants/animations'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import { compareFlatArray, validateWord } from '@/utils'
import evaluateWord from '@/utils/evaluation'
import styles from './index.module.scss'
import type { BoardLetterRef } from '@/components/BoardLetter'
import type { Alphabet } from '@/utils/types'


/**
 * Types
 */
interface BoardRowProps {
  rowIndex: number
}


/**
 * Component
 */
const BoardRow = ({ rowIndex }: BoardRowProps): JSX.Element => {
  const {
    currentWord,
    currentRowIndex,
    evaluating,
    stopEvaluating,
    solution,
    setEvaluationResult,
    setGameStatus,
    boardState,
    evaluations
  } = useGameState((state) => {
    const { currentWord, currentRowIndex, evaluating, stopEvaluating, solution, setEvaluationResult, setGameStatus, boardState, evaluations } = state

    return { currentWord, currentRowIndex, evaluating, stopEvaluating, solution, setEvaluationResult, setGameStatus, boardState, evaluations }
  })
  const setKeyState = useKeyState(s => s.setKeyState)


  // Initialize current letters on board
  useMount(() => {
    if (boardState[rowIndex] === '') return

    const animations: (Promise<void> | undefined)[] = []

    for (let i = 0; i < letterRefs.current.length; i++) {
      animations.push(letterRefs.current[i]?.changeState(evaluations[rowIndex][i], i * 100))
    }

    void Promise.all(animations).then(() => {
      evaluations[rowIndex].forEach((letterState, i) => {
        // @ts-expect-error each letter is Alphabet for sure, and Evaluation result can be assigned to KeyboardLetterState for sure
        setKeyState(boardState[rowIndex][i], letterState)
      })
    })
  })


  const initialWord = useGameState.getState().boardState[rowIndex] // 5-letter word or '' (empty string)
  // @ts-expect-error only Alphabet 5-letter word will be stored into boardState
  const [word, setWord] = useState<Alphabet[]>(initialWord.split(''))
  const [win, setWin] = useState<boolean>(false)


  const rowRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const letterRefs = useRef<(BoardLetterRef | null)[]>([])
  const getLetterRefs = useCallback((ref: BoardLetterRef | null) => {
    if (letterRefs.current.length === WORD_LENGTH) {
      letterRefs.current = []
    }
    letterRefs.current.push(ref)
  }, [])

  useEffect(() => {
    // clear all words when game restart
    if (currentRowIndex === 0 && currentWord.length === 0) {
      setWord(currentWord)
    }

    rowIndex === currentRowIndex && setWord(currentWord)
  }, [currentWord])


  // evaluate word: Animation + GameState update
  const _validateWord = useCallback(async (condition: boolean, message: string): Promise<boolean> => {
    if (condition) {
      toast(message)
      await rowRef.current?.animate(SHAKE, 600).finished
      stopEvaluating()
    }

    return condition
  }, [])

  useAsyncEffect(async () => {
    if (
      rowIndex !== currentRowIndex
      || !evaluating
      || await _validateWord(word.length !== WORD_LENGTH, 'Not enough letters')
      || await _validateWord(!validateWord(word), 'Not in word list')
    ) return

    const evaluationResult = evaluateWord(word, solution)

    const animations: (Promise<void> | undefined)[] = []
    for (let i = 0; i < letterRefs.current.length; i++) {
      animations.push(letterRefs.current[i]?.changeState(evaluationResult[i], i * 250))
    }
    await Promise.all(animations)

    // win
    const win = compareFlatArray(evaluationResult, new Array(WORD_LENGTH).fill(BoardLetterState.correct))
    if (win) {
      setGameStatus(GameStatus.win)
      toast(winPrompt[currentRowIndex], { autoClose: false })

      setWin(true)
      setTimeout(() => {
        setWin(false)
      }, 2000) // should be 1400, but in case of client lagging
    }

    // fail
    if (!win && currentRowIndex === GUESS_CHANCE - 1) {
      setGameStatus(GameStatus.fail)
      toast(solution.toUpperCase(), { autoClose: false })
    }

    setEvaluationResult(word, evaluationResult)

    evaluationResult.forEach((state, i) => {
      // @ts-expect-error Evaluation result can be assigned to KeyboardLetterState for sure
      setKeyState(word[i], state)
    })
  }, [evaluating])


  return (
    <div ref={rowRef} className={styles.boardRow}>
      {new Array(WORD_LENGTH).fill(void 0).map((_, i) => (
        <div
          key={i}
          className={clsx(styles.boardLetterContainer, win && styles.boardRowWin)}
          style={{ '--delay': `.${i}s` }}
        >
          <BoardLetter ref={getLetterRefs} letter={word[i]} />
        </div>
      ))}
    </div>
  )
}

export default BoardRow
