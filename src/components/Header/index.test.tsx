import userEvent from '@testing-library/user-event'
import { expect, describe, it, afterEach } from 'vitest'
import useDarkMode from '@/store/useDarkMode'
import useKeyState from '@/store/useKeyState'
import { render, screen } from '@/test/utils'
import Header from './'


describe('Header', () => {
  // reset store after each test case
  const initialState = useKeyState.getState()
  afterEach(() => {
    useKeyState.setState(initialState, true)
  })


  it(`Aelita's logo is visible`, () => {
    render(<Header />)
    expect(screen.getByAltText(/Aelita's Logo/i)).toBeVisible()
  })

  it(`Wordle's logo is visible`, () => {
    render(<Header />)
    expect(screen.getByAltText(/Wordle's Logo/i)).toBeVisible()
  })

  it(`Click on Wordle's logo will open a new window to official site with noreferrer`, () => {
    render(<Header />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://www.nytimes.com/games/wordle/index.html')
    expect(link).toHaveAttribute('target', expect.stringContaining('_blank'))
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })

  it('Title is visible', () => {
    render(<Header />)
    expect(screen.getByText(/Aelita's Wordle/i)).toBeVisible()
  })

  it('Click icon to toggle dark mode', async () => {
    useDarkMode.setState({ darkMode: true })

    render(<Header />)
    const icon = screen.getByRole('button')

    expect(useDarkMode.getState().darkMode).toBeTruthy()
    await userEvent.click(icon)
    expect(useDarkMode.getState().darkMode).toBeFalsy()
    await userEvent.click(icon)
    expect(useDarkMode.getState().darkMode).toBeTruthy()
  })
})
