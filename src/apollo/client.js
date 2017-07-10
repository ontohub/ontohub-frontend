import { ApolloClient, createNetworkInterface } from 'react-apollo'

const backendHost = process.env.REACT_APP_BACKEND_HOST

const networkInterface = createNetworkInterface({
  uri: `${backendHost}/graphql`
})
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      next()
    }
  },
  {
    applyMiddleware(req, next) {
      Object.assign(req.options.headers, {
        Accept: 'application/json'
      })
      next()
    }
  },
  {
    applyMiddleware(req, next) {
      let authToken = localStorage.getItem('auth-token')
      if (authToken) {
        Object.assign(req.options.headers, {
          Authorization: `Bearer ${authToken}`
        })
      }
      next()
    }
  }
])

export const Client = new ApolloClient({
  networkInterface
})

export default Client
