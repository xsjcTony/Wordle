import clsx from 'clsx'
import { GameStatus } from '@/constants'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import { isAlphabet } from '@/utils/types'
import styles from './index.module.scss'
import type { Alphabet } from '@/utils/types'
import type { ReactElement, MouseEventHandler } from 'react'


interface KeyProps {
  text: Alphabet | ReactElement | 'enter'
  wide?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  label: string
}


const Key = ({ text, wide = false, onClick = void 0, label }: KeyProps): JSX.Element => {
  // @ts-expect-error Have to call hook without condition thus the type of `text` cannot be guaranteed
  const keyState = useKeyState(s => s.keyStateMap[text])

  const {
    evaluating,
    gameStatus,
    insertLetter
  } = useGameState(
    ({ evaluating, gameStatus, insertLetter }) =>
      ({ evaluating, gameStatus, insertLetter })
  )

  const onClickHandler = gameStatus !== GameStatus.inProgress || evaluating
    ? void 0
    : onClick ?? (
      isAlphabet(text)
        ? () => void insertLetter(text)
        : void 0 // 'enter' and 'backspace' excluded
    )

  return (
    <button
      aria-label={label}
      className={clsx(styles.keyboardKey, wide && styles.wide)}
      data-state={keyState}
      type="button"
      onClick={onClickHandler}
    >
      {text}
    </button>
  )
}

export default Key
