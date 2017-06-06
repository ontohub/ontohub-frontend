import { gql } from 'react-apollo'

export const signInMutation = gql`
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    token
  }
}
`

export const currentUserQuery = gql`
query CurrentUser {
  me {
    id
    email
    emailHash
  }
}
`
