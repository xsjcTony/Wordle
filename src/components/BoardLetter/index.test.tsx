import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import BoardLetter from './'


describe('BoardLetter', () => {
  it('Renders correct letter with uppercase', () => {
    render(<BoardLetter letter='a' />)
    const letter = screen.getByText(/a/i)
    const style = getComputedStyle(letter)

    expect(letter).toBeVisible()
    expect(letter).toHaveTextContent(/a/i)
    expect(style.textTransform).toEqual('uppercase')
    expect(letter.dataset['state']).toEqual('empty')
  })
})
