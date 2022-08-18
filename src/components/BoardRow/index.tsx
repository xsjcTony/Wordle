/* eslint-disable react/no-array-index-key */

import { useAsyncEffect } from 'ahooks'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import BoardLetter from '@/components/BoardLetter'
import { BoardLetterState, GameStatus, WORD_LENGTH } from '@/constants'
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
    evaluating
  } = useGameState(
    ({ gameStatus, currentWord, currentRowIndex, evaluating }) =>
      ({ gameStatus, currentWord, currentRowIndex, evaluating })
  )

  const initialWord = useGameState.getState().boardState[rowIndex] // 5-letter word or '' (empty string)
  // @ts-expect-error only Alphabet 5-letter word will be stored into boardState
  const [word, setWord] = useState<Alphabet[]>(initialWord.split(''))

  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  const letterRefs = useRef<(BoardLetterRef | null)[]>([])

  useEffect(() => {
    if (rowIndex !== currentRowIndex) return
    setWord(currentWord)
  }, [currentWord])

  useAsyncEffect(async () => {
    if (rowIndex !== currentRowIndex || evaluating) return

    for (const letterRef of letterRefs.current) {
      await letterRef?.changeState(BoardLetterState.present)
    }
  }, [evaluating])

  return (
    <div className={styles.boardRow}>
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
