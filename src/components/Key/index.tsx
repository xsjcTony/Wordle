import clsx from 'clsx'
import { isAlphabet } from '@/constants'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import styles from './index.module.scss'
import type { Alphabet } from '@/constants'
import type { ReactElement, MouseEventHandler } from 'react'


interface KeyProps {
  text: Alphabet | ReactElement | 'enter'
  wide?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}


const Key = ({ text, wide = false, onClick = void 0 }: KeyProps): JSX.Element => {
  // @ts-expect-error Have to call hook without condition thus the type of `text` cannot be guaranteed
  const keyState = useKeyState(s => s.keyStateMap[text])

  const insertLetter = useGameState(s => s.insertLetter)

  const onClickHandler = onClick ?? (
    isAlphabet(text) ? () => void insertLetter(text) : void 0 // 'enter' and 'backspace' excluded
  )

  return (
    <button
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
