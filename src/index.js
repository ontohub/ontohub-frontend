import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import config from './config'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Client as client } from './apollo'
import { ThemeProvider } from 'styled-components'
import theme from './styles'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <App config={config} />
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
