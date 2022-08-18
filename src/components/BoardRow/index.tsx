/* eslint-disable react/no-array-index-key */

import { useAsyncEffect } from 'ahooks'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import BoardLetter from '@/components/BoardLetter'
import { BoardLetterState, GameStatus, WORD_LENGTH } from '@/constants'
import { SHAKE } from '@/constants/animations'
import useGameState from '@/store/useGameState'
import styles from './index.module.scss'
import type { BoardLetterRef } from '@/components/BoardLetter'
import type { Alphabet } from '@/constants'


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
    gameStatus,
    currentWord,
    currentRowIndex,
    evaluating,
    stopEvaluating
  } = useGameState(
    ({ gameStatus, currentWord, currentRowIndex, evaluating, stopEvaluating }) =>
      ({ gameStatus, currentWord, currentRowIndex, evaluating, stopEvaluating })
  )

  const initialWord = useGameState.getState().boardState[rowIndex] // 5-letter word or '' (empty string)
  // @ts-expect-error only Alphabet 5-letter word will be stored into boardState
  const [word, setWord] = useState<Alphabet[]>(initialWord.split(''))

  const rowRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const letterRefs = useRef<(BoardLetterRef | null)[]>([])

  useEffect(() => void (rowIndex === currentRowIndex && setWord(currentWord)), [currentWord])

  // evaluate word: Animation + GameState update
  useAsyncEffect(async () => {
    if (rowIndex !== currentRowIndex || !evaluating) return

    if (word.length !== WORD_LENGTH) {
      await rowRef.current?.animate(SHAKE, 600).finished
      stopEvaluating()
      return
    }

    for (const letterRef of letterRefs.current) {
      await letterRef?.changeState(BoardLetterState.present)
    }
    stopEvaluating()
    return
  }, [evaluating])

  return (
    <div ref={rowRef} className={styles.boardRow}>
      {new Array(WORD_LENGTH).fill(void 0).map((_, i) => (
        <div
          key={i}
          className={clsx(styles.boardLetterContainer, gameStatus === GameStatus.win && styles.boardRowWin)}
          style={{ '--delay': `.${i}s` }}
        >
          <BoardLetter ref={ref => void (letterRefs.current[i] = ref)} letter={word[i]} />
        </div>
      ))}
    </div>
  )
}

export default BoardRow
