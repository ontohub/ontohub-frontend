import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import config from './config'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App config={config} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
