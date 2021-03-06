import gql from "graphql-tag";

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
`;
