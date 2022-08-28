import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import useGameState from '@/store/useGameState'
import { render, screen } from '@/test/utils'
import Keyboard from './'


describe('Keyboard', () => {
  const initialGameState = useGameState.getState()
  beforeEach(() => {
    useGameState.setState(initialGameState, true)
  })

  it('Press enter to start evaluating', async () => {
    render(<Keyboard />)

    await userEvent.click(screen.getByLabelText(/enter/i))

    expect(useGameState.getState().evaluating).toBe(true)
  })


  it('Press backspace to remove last letter', async () => {
    useGameState.setState({ currentWord: ['a', 'b', 'c'] })

    render(<Keyboard />)

    await userEvent.click(screen.getByLabelText(/backspace/i))

    expect(useGameState.getState().currentWord).toEqual(['a', 'b'])
  })
})
