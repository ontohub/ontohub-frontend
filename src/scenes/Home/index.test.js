import React from 'react'
import { Home, Header } from '.'
import toJSON from 'enzyme-to-json'
import { ThemeProvider } from 'styled-components'
import { render } from 'enzyme'

describe('Home', () => {
  describe('Header', () => {
    it('matches the snapshot', () => {
      let wrapper = render(
        <ThemeProvider theme={{ sizes: { headerPadding: '1em' } }}>
          <Header />
        </ThemeProvider>
      )

      expect(toJSON(wrapper)).toMatchSnapshot()
    })
  })

  describe('Body', () => {
    it('matches the snapshot', () => {
      let wrapper = render(<Home />)

      expect(toJSON(wrapper)).toMatchSnapshot()
    })
  })
})
