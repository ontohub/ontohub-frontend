import { ApolloClient, createNetworkInterface } from 'react-apollo'

const backendHost = process.env.REACT_APP_BACKEND_HOST

const networkInterface = createNetworkInterface({
  uri: `${backendHost}/graphql`
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
