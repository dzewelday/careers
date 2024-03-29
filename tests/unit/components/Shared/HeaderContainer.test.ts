import { render, screen } from '@testing-library/vue'
import { expect } from 'vitest'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('headerContainer', () => {
  it('allows parent component to provide title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h1>The Title</h1>',
      },
    })

    expect(screen.getByText('The Title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h3>subtitle</h3>',
      },
    })

    expect(screen.getByText('subtitle')).toBeInTheDocument()
  })
})
