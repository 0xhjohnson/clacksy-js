import { render, screen } from '@testing-library/react'
import Header from '@/components/registration/Header'

describe('Header', () => {
  it('renders with heading', () => {
    const title = 'Sign in to your account'
    const subtitle = { text: '', href: '' }

    render(<Header title={title} subtitle={subtitle} />)

    const heading = screen.getByRole('heading', {
      name: title,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders with subtitle link', () => {
    const title = ''
    const subtitle = { text: 'sign up for free account', href: '/signup' }

    render(<Header title={title} subtitle={subtitle} />)

    const subtitleLink = screen.getByRole('link', {
      name: subtitle.text,
    })

    expect(subtitleLink).toBeInTheDocument()
  })
})
