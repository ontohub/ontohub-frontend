import React from 'react'

import { storiesOf } from '@storybook/react'

import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles'
import GlobalMenu from '../GlobalMenu'

const Decorator = (storyFn) => (
  <Router>
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </Router>
)

storiesOf('GlobalMenu', module)
  .addDecorator(Decorator)
  .add('signed in', () => (
    <GlobalMenu
      me={{ id: 'ada', emailHash: '3e3417d7ef77d5932a6734b916515ed5' }}
    />
  ))
  .add('not signed in', () => <GlobalMenu />)
