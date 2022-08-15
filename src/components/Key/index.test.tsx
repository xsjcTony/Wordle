import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import Key from './'


describe('Key', () => {
  it('Key renders with correct uppercase text and correct size', () => {
    render(<Key wide text="heLLo" />)
    const button = screen.getByRole('button')
    const buttonStyle = getComputedStyle(button)

    expect(button).toBeVisible()
    expect(button).toHaveTextContent(/hello/i)
    expect(buttonStyle.textTransform).toEqual('uppercase')
    expect(buttonStyle.fontSize).toEqual('12px')
    expect(buttonStyle.flexGrow).toEqual('1.5')
  })
})
