import { gql } from 'react-apollo'

export const getUserQuery = gql`
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
  }
}
`
