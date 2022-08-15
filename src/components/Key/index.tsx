import clsx from 'clsx'
import { useState } from 'react'
import { LetterState } from '@/components/Board'
import useInput from '@/store/useInput'
import styles from './index.module.scss'
import type { ReactElement, MouseEventHandler } from 'react'


interface KeyProps {
  text: ReactElement | string
  wide?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}


const Key = ({ text, wide = false, onClick = void 0 }: KeyProps): JSX.Element => {
  console.log('Key rendered')

  const [keyState, setKeyState] = useState<LetterState>()
  const push = useInput(s => s.push)


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
