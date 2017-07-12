import { gql } from 'react-apollo'

export const signUpMutation = gql`
  mutation SignUp($user: NewUser!, $captcha: String!) {
    signUp(user: $user, captcha: $captcha) {
      jwt
      me {
        id
        displayName
        email
        emailHash
        __typename
      }
      __typename
    }
  }
`
