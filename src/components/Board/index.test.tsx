import { describe, expect, it } from 'vitest'
import { render, screen } from '@/test/utils'
import Board from './'


describe('Board', () => {
  it('Render boardRows with flex layout with direction of column', () => {
    render(<Board />)
    const board = screen.getByLabelText(/game board/i)
    const style = getComputedStyle(board)

    expect(style.display).toBe('flex')
    expect(style.flexDirection).toBe('column')
  })


  it('6 Rows are rendered', () => {
    render(<Board />)
    const boardRows = screen.getAllByLabelText(/guessed word/i)
    expect(boardRows.length).toBe(6)
  })
})
