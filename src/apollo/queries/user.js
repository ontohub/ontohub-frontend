import { gql } from 'react-apollo'

export const userQuery = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`
