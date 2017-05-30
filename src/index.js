import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import config from './config'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Router>
    <App config={config} />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
