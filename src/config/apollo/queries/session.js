import gql from "graphql-tag";

export const signInMutation = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
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

export const currentUserQuery = gql`
  query CurrentUser {
    me {
      id
      displayName
      email
      emailHash
      __typename
    }
  }
`;
