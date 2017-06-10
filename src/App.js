// @flow

import React, { Component } from 'react'
import { VersionWarning, GlobalMenu } from './containers'
import { Home } from './scenes'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

class App extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <GlobalMenu />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <VersionWarning requirement={this.props.config.version} />
      </div>
    )
  }
}

const StyledApp = styled(App)`
  position: relative;
  top: calc(${({ theme }) => theme.sizes.menuHeight} - 1px);
  margin-bottom: ${({ theme }) => theme.sizes.footerMargin};
`

export default StyledApp
