import { afterEach, describe, expect, it } from 'vitest'
import { KeyboardLetterState } from '@/constants'
import useKeyState from '@/store/useKeyState'
import { render, screen, act } from '@/test/utils'
import Key from './'


describe('Key', () => {
  // reset store after each test case
  const initialState = useKeyState.getState()
  afterEach(() => {
    useKeyState.setState(initialState, true)
  })


  it('Key renders with correct uppercase text and correct size', () => {
    render(<Key wide text="h" />)
    const button = screen.getByRole('button')
    const buttonStyle = getComputedStyle(button)

    expect(button).toBeVisible()
    expect(button).toHaveTextContent(/h/i)
    expect(buttonStyle.textTransform).toEqual('uppercase')
    expect(buttonStyle.fontSize).toEqual('12px')
    expect(buttonStyle.flexGrow).toEqual('1.5')
  })

  it('Key renders with correct state', () => {
    render(<Key text="a" />)
    const button = screen.getByRole('button')

    expect(button.dataset['state']).toBeUndefined()

    act(() => void useKeyState.getState().setKeyState('a', KeyboardLetterState.present))

    expect(button.dataset['state']).toEqual(KeyboardLetterState.present)
  })
})
