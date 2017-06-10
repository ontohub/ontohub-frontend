import React from 'react'
import { Header, PaddedContainer } from '../Header'
import toJSON from 'enzyme-to-json'
import { ThemeProvider } from 'styled-components'
import { render } from 'enzyme'

describe('Header', () => {
  it('matches the snapshot', () => {
    const wrapper = render(
      <ThemeProvider
        theme={{ colors: { dark: '#000' }, sizes: { contentWidth: '700px' } }}
      >
        <Header>
          Header content
        </Header>
      </ThemeProvider>
    )
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})

describe('PaddedContainer', () => {
  it('matches the snapshot', () => {
    const wrapper = render(
      <ThemeProvider theme={{ sizes: { headerPadding: '1em' } }}>
        <PaddedContainer>
          Header content
        </PaddedContainer>
      </ThemeProvider>
    )
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
