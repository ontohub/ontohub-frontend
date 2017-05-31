import React, { Component } from 'react'
import VersionWarning from './containers/VersionWarning'
import { GlobalMenu, Home } from './components'
import { Switch, Route } from 'react-router-dom'
import { Block } from 'jsxstyle'

class App extends Component {
  render() {
    return (
      <Block position="relative" top={49} marginBottom={100}>
        <GlobalMenu />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <VersionWarning requirement={this.props.config.version} />
      </Block>
    )
  }
}

export default App
