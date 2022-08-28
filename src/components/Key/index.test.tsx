import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { GameStatus, KeyboardLetterState } from '@/constants'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import { act, render, screen } from '@/test/utils'
import Key from './'


describe('Key', () => {
  // reset store after each test case
  const initialKeyState = useKeyState.getState()
  const initialGameState = useGameState.getState()
  afterEach(() => {
    useKeyState.setState(initialKeyState, true)
    useGameState.setState(initialGameState, true)
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

    expect(button.dataset['state']).toBe(KeyboardLetterState.present)

    act(() => void useKeyState.getState().setKeyState('a', KeyboardLetterState.correct))

    expect(button.dataset['state']).toBe(KeyboardLetterState.correct)
  })


  it('Insert letter upon click a key', async () => {
    render(<Key text="a" />)
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(useGameState.getState().currentWord.length).toBe(1)
  })


  it('Nothing happens upon click a key if evaluating', async () => {
    useGameState.setState({ evaluating: true })

    render(<Key text="a" />)
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(useGameState.getState().currentWord.length).toBe(0)
  })


  it('Nothing happens upon click a key if game is not IN_PROGRESS', async () => {
    useGameState.setState({ gameStatus: GameStatus.win })

    render(<Key text="a" />)
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(useGameState.getState().currentWord.length).toBe(0)
  })
})
