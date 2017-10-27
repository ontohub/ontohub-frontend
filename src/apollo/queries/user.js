import gql from "graphql-tag";

export const userQuery = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;
