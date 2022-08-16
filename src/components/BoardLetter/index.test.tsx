import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import BoardLetter from './'


describe('BoardLetter', () => {
  it('Renders with uppercase and empty state initially', () => {
    render(<BoardLetter />)

    const letter = screen.getByLabelText('guessed letter')
    const style = getComputedStyle(letter)

    expect(letter).toBeVisible()
    expect(style.textTransform).toEqual('uppercase')
    expect(letter.dataset['state']).toEqual('empty')
  })
})
