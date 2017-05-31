import React, { Component } from 'react'
import VersionWarning from './containers/VersionWarning'
import { GlobalMenu, Home } from './components'
import { Switch, Route } from 'react-router-dom'
import { css, sizes } from './styles'

const appStyle = css({
  position: 'relative',
  top: sizes.menuHeight - 1,
  marginBottom: sizes.footerMargin
})

class App extends Component {
  render() {
    return (
      <div {...appStyle}>
        <GlobalMenu />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <VersionWarning requirement={this.props.config.version} />
      </div>
    )
  }
}

export default App
