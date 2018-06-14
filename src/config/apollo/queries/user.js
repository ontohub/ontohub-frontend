import gql from "graphql-tag";

export const userQuery = gql`
  query GetUser($id: ID!) {
    organizationalUnit(id: $id) {
      id
      displayName
    }
  }
`;
