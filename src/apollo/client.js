import {
  ApolloClient,
  printAST,
  createBatchingNetworkInterface
} from 'react-apollo'
import { graphql } from 'graphql'
import { schema } from './schema'
import config from '../config'

const networkInterface = createBatchingNetworkInterface({
  uri: `${config.api.endpoint}/graphql`,
  batchInterval: 10
})
networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
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
// export const LocalClient = new ApolloClient({
//   networkInterface: {
//     query(req) {
//       const query = printAST(req.query),
//             { operationName, variables = {} } = req

//       return graphql(schema, query, null, null, variables, operationName)
//     }
//   }
// })

export const Client = new ApolloClient({
  networkInterface
})

export default Client
