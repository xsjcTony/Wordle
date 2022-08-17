import { useRef } from 'react'
import { act } from 'react-dom/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { BoardLetterState } from '@/constants'
import { render, screen } from '@/test/utils'
import BoardLetter from './'
import type { BoardLetterRef } from './'
import type { RefObject } from 'react'


describe('BoardLetter', () => {
  it('Renders with uppercase and empty state initially', () => {
    render(<BoardLetter />)

    const letter = screen.getByLabelText('guessed letter')
    const style = getComputedStyle(letter)

    expect(letter).toBeVisible()
    expect(style.textTransform).toEqual('uppercase')
    expect(letter.dataset['state']).toEqual('empty')
  })

  it('Correctly insert and remove letter', () => {
    let ref: RefObject<BoardLetterRef>

    const UseRefs = (): JSX.Element => {
      ref = useRef<BoardLetterRef>(null)

      return <BoardLetter ref={ref} />
    }

    render(<UseRefs />)

    const letter = screen.getByLabelText('guessed letter')

    letter.animate = vi.fn()
    letter.getAnimations = vi.fn(() => [])

    // @ts-expect-error ref is assigned
    ref.current?.insertLetter('t')
    expect(letter.innerText).toEqual('t')

    // @ts-expect-error ref is assigned
    ref.current?.removeLetter()
    expect(letter.innerText).toEqual('')
  })

  it('Letter state is correctly changed', async () => {
    let ref: RefObject<BoardLetterRef>

    const UseRefs = (): JSX.Element => {
      ref = useRef<BoardLetterRef>(null)

      return <BoardLetter ref={ref} />
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
