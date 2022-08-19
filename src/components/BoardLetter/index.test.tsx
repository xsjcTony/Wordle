import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { BoardLetterState } from '@/constants'
import { render, screen, act } from '@/test/utils'
import BoardLetter from './'
import type { BoardLetterRef } from './'
import type { RefObject } from 'react'


describe('BoardLetter', () => {
  it('Renders with uppercase and empty state initially', () => {
    render(<BoardLetter letter={void 0} />)

    const letter = screen.getByLabelText('guessed letter')
    const style = getComputedStyle(letter)

    expect(letter).toBeVisible()
    expect(style.textTransform).toEqual('uppercase')
    expect(letter.dataset['state']).toEqual('empty')
  })

  it('Insertion and removal of the letter', () => {
    const { rerender } = render(<BoardLetter letter={void 0} />)

    const letter = screen.getByLabelText('guessed letter')
    // @ts-expect-error Mock Web Animations API
    letter.animate = vi.fn(() => ({ finished: Promise.resolve() }))
    letter.getAnimations = vi.fn(() => [])

    rerender(<BoardLetter letter="a" />)

    expect(letter.innerHTML).toEqual('a')
    expect(letter.dataset['state']).toEqual('tbd')

    rerender(<BoardLetter letter={void 0} />)

    expect(letter.innerHTML).toBeFalsy()
    expect(letter.dataset['state']).toEqual('empty')
  })

  it('Letter state is correctly changed', async () => {
    let ref: RefObject<BoardLetterRef>

    const UseRefs = (): JSX.Element => {
      ref = useRef<BoardLetterRef>(null)

      return <BoardLetter ref={ref} letter={void 0} />
    }

    render(<UseRefs />)

    const letter = screen.getByLabelText('guessed letter')

    // @ts-expect-error Mock Web Animations API
    letter.animate = vi.fn(() => ({ finished: Promise.resolve() }))

    // @ts-expect-error ref is assigned
    await act(() => ref.current?.changeState(BoardLetterState.tbd))
    expect(letter.dataset['state']).toEqual(BoardLetterState.tbd)

    // @ts-expect-error ref is assigned
    await act(() => ref.current?.changeState(BoardLetterState.absent))
    expect(letter.dataset['state']).toEqual(BoardLetterState.absent)

    // @ts-expect-error ref is assigned
    await act(() => ref.current?.changeState(BoardLetterState.present))
    expect(letter.dataset['state']).toEqual(BoardLetterState.present)

    // @ts-expect-error ref is assigned
    await act(() => ref.current?.changeState(BoardLetterState.correct))
    expect(letter.dataset['state']).toEqual(BoardLetterState.correct)
  })
})
