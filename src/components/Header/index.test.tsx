import userEvent from '@testing-library/user-event'
import { expect, describe, it } from 'vitest'
import { render, screen } from '@/test/utils'
import Header from './'


describe('Header', () => {
  it(`Aelita's logo is visible`, () => {
    render(<Header />)
    expect(screen.getByAltText(/Aelita's Logo/i)).toBeVisible()
  })

  it(`Wordle's logo is visible`, () => {
    render(<Header />)
    expect(screen.getByAltText(/Wordle's Logo/i)).toBeVisible()
  })

  it('Title is visible', () => {
    render(<Header />)
    expect(screen.getByText(/Aelita's Wordle/i)).toBeVisible()
  })

  it('Click icon to toggle dark mode', async () => {
    const { baseElement } = render(<Header />)
    const icon = screen.getByRole('button')

    expect(baseElement).not.toHaveClass('dark')
    await userEvent.click(icon)
    expect(baseElement).toHaveClass('dark')
    await userEvent.click(icon)
    expect(baseElement).not.toHaveClass('dark')
  })

  it('Get and set dark mode status from / into local storage', async () => {
    // make dark-mode to be true in Local Storage
    window.localStorage.setItem('dark-mode', 'true')

    const { baseElement } = render(<Header />)
    expect(baseElement).toHaveClass('dark')

    await userEvent.click(screen.getByRole('button'))
    expect(window.localStorage.getItem('dark-mode')).toBe('false')

    // clean up
    window.localStorage.removeItem('dark-mode')
  })
})
