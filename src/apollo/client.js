import { ApolloClient, printAST } from 'react-apollo'
import { graphql } from 'graphql'
import { schema } from './schema'

export const client = new ApolloClient({
  networkInterface: {
    query(req) {
      const query = printAST(req.query), { operationName, variables = {} } = req

      return graphql(schema, query, null, null, variables, operationName)
    }
  }
})

export default client
