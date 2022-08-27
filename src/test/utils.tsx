/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { cleanup, render } from '@testing-library/react'
import { afterEach, vi, beforeAll } from 'vitest'
import type { RenderOptions } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'


// Web Animations API mocking
beforeAll(() => {
  Element.prototype.getAnimations = vi.fn(() => [])
  // @ts-expect-error Mock Web Animations API
  Element.prototype.animate = vi.fn(() => ({ finished: Promise.resolve() }))
})

afterEach(() => {
  cleanup()
})


// wrap provider(s) here if needed
const AllProviders = ({ children }: PropsWithChildren): JSX.Element => <>{children}</>

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })


export * from '@testing-library/react'
// override render export
export { customRender as render }
