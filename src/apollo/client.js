import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo'

const backendHost = process.env.REACT_APP_BACKEND_HOST

const networkInterface = createBatchingNetworkInterface({
  uri: `${backendHost}/graphql`,
  batchInterval: 10
})

export const Client = new ApolloClient({
  networkInterface,
  queryDeduplication: true
})

networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      next()
    }
  },
  {
    applyBatchMiddleware(req, next) {
      Object.assign(req.options.headers, {
        Accept: 'application/json'
      })
      next()
    }
  },
  {
    applyBatchMiddleware(req, next) {
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


export default Client
