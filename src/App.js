// @flow

import React, { Component } from 'react'
import { Header } from './components'
import { VersionWarning, GlobalMenu } from './containers'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <GlobalMenu />
        <Header>
          <Switch>
            {routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.header}
              />
            )}
          </Switch>
        </Header>
        <Switch>
          {routes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          )}
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
