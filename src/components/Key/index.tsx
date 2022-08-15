import clsx from 'clsx'
import useInput from '@/store/useInput'
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
  console.log('Key rendered')

  const push = useInput(s => s.push)

  // @ts-expect-error Have to call hook without condition thus the type of `text` cannot be guaranteed
  const keyState = useKeyState(s => s.keyStateMap[text])

  const onClickHandler = onClick ?? ( // TODO: change later
    typeof text === 'string'
      ? () => void push(text)
      : void 0
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
