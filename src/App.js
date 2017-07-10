// @flow

import React from 'react'
import { Header } from './components'
import { VersionWarning, GlobalMenu } from './containers'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import routes from './routes'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import config from './config.json'

const backendVersion = config.ontohub.backendVersion

const App = (props) =>
  <div className={props.className}>
    <GlobalMenu />
    <Header heightTransitionDuration=".4s" contentTransitionDuration=".1s">
      <Route
        render={({ location }) =>
          <ReactCSSTransitionReplace
            transitionName="cross-fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <Switch key={location.pathname} location={location}>
              {routes.map((route, index) =>
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.header}
                />
              )}
            </Switch>
          </ReactCSSTransitionReplace>}
      />
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
    <VersionWarning requirement={backendVersion} />
  </div>

const StyledApp = styled(App)`
  position: relative;
  top: calc(${({ theme }) => theme.sizes.menuHeight} - 1px);
  margin-bottom: ${({ theme }) => theme.sizes.footerMargin};
`

export default StyledApp
