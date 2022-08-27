import { afterEach, describe, it, expect } from 'vitest'
import { BoardLetterState, GameStatus } from '@/constants'
import useGameState from '@/store/useGameState'
import useKeyState from '@/store/useKeyState'
import { render, screen, act } from '@/test/utils'
import BoardRow from './'


describe('BoardRow (all rowIndex is 0)', () => {
  // reset store after each test case
  const initialKeyState = useKeyState.getState()
  const initialGameState = useGameState.getState()
  afterEach(() => {
    useKeyState.setState(initialKeyState, true)
    useGameState.setState(initialGameState, true)
  })


  it('KeyState is evaluated on first time mounted', async () => {
    useGameState.setState({
      solution: 'humid',
      boardState: ['aumda', '', '', '', '', ''],
      // @ts-expect-error Empty Evaluations
      evaluations: [[BoardLetterState.absent, BoardLetterState.correct, BoardLetterState.correct, BoardLetterState.present, BoardLetterState.absent], [], [], [], [], []],
      currentRowIndex: 1
    })

    render(<BoardRow rowIndex={0} />)

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(useKeyState.getState().keyStateMap).toEqual({
          a: BoardLetterState.absent,
          u: BoardLetterState.correct,
          m: BoardLetterState.correct,
          d: BoardLetterState.present
        })
        resolve()
      }, 500) // actually 400ms delay for consecutive animation
    })
  })


  it('Row is cleared when game reset', () => {
    useGameState.setState({
      solution: 'humid',
      boardState: ['aaaaa', '', '', '', '', ''],
      // @ts-expect-error Empty Evaluations
      evaluations: [[BoardLetterState.absent, BoardLetterState.correct, BoardLetterState.correct, BoardLetterState.present, BoardLetterState.absent], [], [], [], [], []],
      currentRowIndex: 1
    })

    render(<BoardRow rowIndex={0} />)
    const firstLetter = screen.getAllByLabelText(/guessed letter/i)[0]

    expect(firstLetter.innerHTML).toBe('a')
    act(() => void useGameState.getState().restartGame())
    expect(firstLetter.innerHTML).toBe('')
  })


  it('Row is updated when input has been detected', () => {
    render(<BoardRow rowIndex={0} />)
    const firstLetter = screen.getAllByLabelText(/guessed letter/i)[0]
    const secondLetter = screen.getAllByLabelText(/guessed letter/i)[1]

    act(() => void useGameState.getState().insertLetter('b'))
    expect(firstLetter.innerHTML).toBe('b')
    act(() => void useGameState.getState().insertLetter('c'))
    expect(secondLetter.innerHTML).toBe('c')
  })


  describe('Evaluate word', () => {
    it(`Nothing happens if 'not enough letters'`, async () => {
      render(<BoardRow rowIndex={0} />)
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().evaluating).toBe(false)
          expect(useGameState.getState().currentRowIndex).toBe(0)
          resolve()
        }, 50) // to wait for evaluation done
      })
    })


    it(`Nothing happens if 'Not in word list'`, async () => {
      render(<BoardRow rowIndex={0} />)
      void act(() => void useGameState.setState({ currentWord: ['a', 'a', 'a', 'a', 'a'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().evaluating).toBe(false)
          expect(useGameState.getState().currentRowIndex).toBe(0)
          resolve()
        }, 50) // to wait for evaluation done
      })
    })


    it('Nothing happens if hard mode is ON and validation failed because of CORRECT letter', async () => {
      useGameState.setState({
        hardMode: true,
        solution: 'humid',
        boardState: ['aaaaa', '', '', '', '', ''],
        // @ts-expect-error Empty Evaluations
        evaluations: [[BoardLetterState.correct, BoardLetterState.absent, BoardLetterState.absent, BoardLetterState.absent, BoardLetterState.absent], [], [], [], [], []],
        currentRowIndex: 1
      })

      render(<BoardRow rowIndex={1} />)

      void act(() => void useGameState.setState({ currentWord: ['d', 'a', 'n', 'c', 'e'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().evaluating).toBe(false)
          expect(useGameState.getState().currentRowIndex).toBe(1)
          resolve()
        }, 50) // to wait for evaluation done
      })
    })


    it('Nothing happens if hard mode is ON and validation failed because of PRESENT letter', async () => {
      useGameState.setState({
        hardMode: true,
        solution: 'humid',
        boardState: ['bbbbb', '', '', '', '', ''],
        // @ts-expect-error Empty Evaluations
        evaluations: [[BoardLetterState.present, BoardLetterState.absent, BoardLetterState.absent, BoardLetterState.absent, BoardLetterState.absent], [], [], [], [], []],
        currentRowIndex: 1
      })

      render(<BoardRow rowIndex={1} />)

      void act(() => void useGameState.setState({ currentWord: ['d', 'a', 'n', 'c', 'e'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().evaluating).toBe(false)
          expect(useGameState.getState().currentRowIndex).toBe(1)
          resolve()
        }, 50) // to wait for evaluation done
      })
    })


    it('word evaluated successfully', async () => {
      render(<BoardRow rowIndex={0} />)
      void act(() => void useGameState.setState({ currentWord: ['h', 'u', 'm', 'i', 'd'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().evaluating).toBe(false)
          expect(useGameState.getState().currentRowIndex).toBe(1)
          resolve()
        }, 1100) // actually 1000ms delay for consecutive animation
      })
    })


    it('Win game', async () => {
      useGameState.setState({ solution: 'humid' })

      render(<BoardRow rowIndex={0} />)

      void act(() => void useGameState.setState({ currentWord: ['h', 'u', 'm', 'i', 'd'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().currentRowIndex).toBe(1)
          expect(useGameState.getState().gameStatus).toBe(GameStatus.win)
          resolve()
        }, 1100) // actually 1000ms delay for consecutive animation
      })
    })


    it('Lost game', async () => {
      useGameState.setState({
        solution: 'humid',
        currentRowIndex: 5
      })

      render(<BoardRow rowIndex={5} />)

      void act(() => void useGameState.setState({ currentWord: ['d', 'a', 'n', 'c', 'e'] }))
      void act(() => void useGameState.getState().startEvaluating())

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(useGameState.getState().currentRowIndex).toBe(6)
          expect(useGameState.getState().gameStatus).toBe(GameStatus.fail)
          resolve()
        }, 1100) // actually 1000ms delay for consecutive animation
      })
    })
  })
})
