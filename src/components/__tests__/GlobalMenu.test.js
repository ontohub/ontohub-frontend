import React from 'react'
import GlobalMenu from '../GlobalMenu'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles'

describe('GlobalMenu', () => {
  describe('signed out user', () => {
    it('matches the snapshot', () => {
      const wrapper = render(
        <Router>
          <ThemeProvider
            theme={{ colors: { dark: '#000' }, sizes: { menuHeight: '50px' } }}
          >
            <GlobalMenu />
          </ThemeProvider>
        </Router>
      )
      expect(toJSON(wrapper)).toMatchSnapshot()
    })
  })
  describe('signed in user', () => {
    it('matches the snapshot', () => {
      const wrapper = render(
        <Router>
          <ThemeProvider
            theme={{ colors: { dark: '#000' }, sizes: { menuHeight: '50px' } }}
          >
            <GlobalMenu currentUser={{ id: 'ada', email: 'ada@example.com' }} />
          </ThemeProvider>
        </Router>
      )
      expect(toJSON(wrapper)).toMatchSnapshot()
    })
  })
  it('contains the title link', () => {
    const wrapper = render(
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalMenu />
        </ThemeProvider>
      </Router>
    )
    expect(wrapper.find('a').text()).toContain('Ontohub')
  })
})
