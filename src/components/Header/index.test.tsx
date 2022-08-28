import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { GameStatus } from '@/constants'
import useDarkMode from '@/store/useDarkMode'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import { render, screen } from '@/test/utils'
import Header from './'


describe('Header', () => {
  // reset store after each test case
  const initialKeyState = useKeyState.getState()
  const initialGameState = useGameState.getState()
  afterEach(() => {
    useKeyState.setState(initialKeyState, true)
    useGameState.setState(initialGameState, true)
  })


  describe(`Aelita's logo`, () => {
    it(`Logo is visible`, () => {
      render(<Header />)
      expect(screen.getByAltText(/Aelita's Logo/i)).toBeVisible()
    })


    it(`Click on logo will open a new window to Aelita's github page`, () => {
      render(<Header />)
      const link = screen.getByTitle(/Aelita's github page/i)
      expect(link).toHaveAttribute('href', 'https://github.com/xsjcTony')
      expect(link).toHaveAttribute('target', expect.stringContaining('_blank'))
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    })
  })


  describe(`Wordle's logo`, () => {
    it(`Logo is visible`, () => {
      render(<Header />)
      expect(screen.getByAltText(/Wordle's Logo/i)).toBeVisible()
    })


    it(`Click on logo will open a new window to Wordle's official site`, () => {
      render(<Header />)
      const link = screen.getByTitle(/wordle's official site/i)
      expect(link).toHaveAttribute('href', 'https://www.nytimes.com/games/wordle/index.html')
      expect(link).toHaveAttribute('target', expect.stringContaining('_blank'))
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    })
  })


  describe('Title', () => {
    it('Title is visible with correct font-family and aligned to baseline', () => {
      render(<Header />)
      const title = screen.getByLabelText(/title/i)
      const style = getComputedStyle(title)

      expect(title).toBeVisible()
      expect(style.fontFamily).toBe('nyt-karnakcondensed')
      expect(style.alignItems).toBe('baseline')
    })
  })


  describe('Dark mode', () => {
    it('Click icon to toggle dark mode', async () => {
      useDarkMode.setState({ darkMode: true })

      render(<Header />)

      expect(useDarkMode.getState().darkMode).toBe(true)
      await userEvent.click(screen.getByLabelText(/dark mode/))
      expect(useDarkMode.getState().darkMode).toBe(false)
      await userEvent.click(screen.getByLabelText(/dark mode/))
      expect(useDarkMode.getState().darkMode).toBe(true)
    })
  })


  describe('Hard mode', () => {
    it(`Show letter 'E' with hard mode OFF`, () => {
      render(<Header />)

      expect(screen.getByTitle(/turn hard mode/i).innerHTML).toBe('E')
    })

    it(`Show letter 'H' with hard mode ON`, () => {
      useGameState.setState({ hardMode: true })

      render(<Header />)

      expect(screen.getByTitle(/turn hard mode/i).innerHTML).toBe('H')
    })

    it('Prevent hard mode on when game is in-progress and first round has been completed', async () => {
      useGameState.setState({ currentRowIndex: 1 })

      render(<Header />)
      const icon = screen.getByTitle(/turn hard mode/i)

      await userEvent.click(icon)
      expect(useGameState.getState().hardMode).toBeFalsy()
    })
  })

  describe('Reset game', () => {
    it('Button is invisible when game is in progress', () => {
      render(<Header />)

      expect(screen.getByLabelText(/start a new round/i)).not.toBeVisible()
    })

    it('Win -> new round upon press the button', async () => {
      useGameState.setState({ gameStatus: GameStatus.win })

      render(<Header />)
      const icon = screen.getByLabelText(/start a new round/i)

      expect(icon).toBeVisible()
      await userEvent.click(icon)
      expect(useGameState.getState().gameStatus).toBe(GameStatus.inProgress)
    })

    it('Fail -> new round upon press the button', async () => {
      useGameState.setState({ gameStatus: GameStatus.fail })

      render(<Header />)
      const icon = screen.getByLabelText(/start a new round/i)

      expect(icon).toBeVisible()
      await userEvent.click(icon)
      expect(useGameState.getState().gameStatus).toBe(GameStatus.inProgress)
    })
  })
})
