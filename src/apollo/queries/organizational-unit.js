import { gql } from 'react-apollo'

export const organizationalUnitQuery = gql`
  query GetOrganizationalUnit($id: ID!) {
    organizationalUnit(id: $id) {
      id
      displayName
      repositories {
        id
        name
        description
        visibility
      }
      ... on User {
        emailHash
        organizations {
          id
          displayName
          description
        }
      }
      ... on Organization {
        description
        members {
          id
          displayName
          emailHash
        }
      }
    }
  }
`
