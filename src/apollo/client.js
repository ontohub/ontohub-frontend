import { ApolloClient, createNetworkInterface } from 'react-apollo'
import config from '../config'

const networkInterface = createNetworkInterface({
  uri: `${config.api.endpoint}/graphql`
})
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }
      let authToken = localStorage.getItem('auth-token')
      if (authToken) {
        req.options.headers['Authorization'] = `Bearer ${authToken}`
      }
      next()
    }
  }
])

export const Client = new ApolloClient({
  networkInterface
})

export default Client
