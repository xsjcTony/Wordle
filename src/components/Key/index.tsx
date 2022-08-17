import clsx from 'clsx'
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

  const onClickHandler = onClick ?? ((): void => {
    return void 0 // TODO: insert letter to board
  })

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
