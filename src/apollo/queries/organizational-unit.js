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
        organizationMemberships {
          organization {
            id
            displayName
            description
          }
        }
      }
      ... on Organization {
        description
        memberships {
          member {
            id
            displayName
            emailHash
          }
          role
        }
      }
    }
  }
`
