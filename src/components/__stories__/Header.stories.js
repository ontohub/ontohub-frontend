import React from 'react'

import { storiesOf } from '@storybook/react'

import { ThemeProvider } from 'styled-components'
import theme from '../../styles'
import { Icon, Input, Header as SemHeader, Menu } from 'semantic-ui-react'
import Header, { PaddedContainer } from '../Header'

const Decorator = (storyFn) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

storiesOf('Header', module)
  .addDecorator(Decorator)
  .add('without bottom padding', () => (
    <Header>
      <SemHeader as="h2" inverted>
        ada / repo0
        <SemHeader.Subheader>An awesome sample repository</SemHeader.Subheader>
      </SemHeader>
      <Menu inverted secondary pointing>
        <Menu.Item link active={true}>
          Tab 1
        </Menu.Item>
        <Menu.Item link>Tab 2</Menu.Item>
        <Menu.Item link>Tab 3</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item link>
            <Icon name="settings" />
            Settings
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Header>
  ))
  .add('with bottom padding', () => (
    <Header>
      <PaddedContainer>
        <SemHeader as="h2" inverted>
          Advanced search
        </SemHeader>
        <Input
          fluid
          placeholder="Search"
          action={{
            labelPosition: 'right',
            content: 'Search',
            color: 'blue',
            icon: 'search'
          }}
        />
      </PaddedContainer>
    </Header>
  ))
