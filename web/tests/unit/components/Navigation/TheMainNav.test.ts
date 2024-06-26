import { RouterLinkStub } from '@vue/test-utils'
import { type Mock, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import TheMainNav from '@/components/Navigation/TheMainNav.vue'

vi.mock('vue-router')
const useRouteMock = useRoute as Mock

describe('theMainNav', () => {
  const renderMainNav = () => {
    useRouteMock.mockReturnValue({ name: 'Home' })
    const pinia = createTestingPinia()

    render(TheMainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  it('displays company name', () => {
    renderMainNav()
    const companyName = screen.getByText('Bobo Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('displays menu items for navigation', () => {
    renderMainNav()
    const navigationMenuItems = screen.getAllByRole('listitem')

    const navigationMenuTexts = navigationMenuItems
      .map(item => item.textContent)

    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Benefits',
      'Jobs',
      'Students',
    ])
  })

  describe('when the user logs in', () => {
    it('displays user profile picture', async () => {
      renderMainNav()
      const userStore = useUserStore()

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      })
      userStore.isLoggedIn = true
      await fireEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
