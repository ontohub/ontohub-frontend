import gql from "graphql-tag";

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
        permissions {
          role
        }
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
`;

export const saveOrganizationMutation = gql`
  mutation SaveOrganization($id: ID!, $data: OrganizationChangeset!) {
    saveOrganization(id: $id, data: $data) {
      id
      description
      displayName
    }
  }
`;
