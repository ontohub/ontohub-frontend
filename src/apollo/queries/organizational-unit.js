import gql from "graphql-tag";
import { graphql } from "react-apollo";

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
export const withSaveOrganizationMutation = graphql(saveOrganizationMutation, {
  props: ({ mutate, ownProps: { id } }) => ({
    saveOrganization: data => mutate({ variables: { id, data } })
  })
});

export const addOrganizationMemberMutation = gql`
  mutation AddOrganizationMember(
    $organization: ID!
    $member: ID!
    $role: OrganizationRole!
  ) {
    addOrganizationMember(
      organization: $organization
      member: $member
      role: $role
    ) {
      member {
        id
      }
      organization {
        id
      }
      role
    }
  }
`;

export const withAddOrganizationMemberMutation = graphql(
  addOrganizationMemberMutation,
  {
    props: ({ mutate, ownProps: { id: organization } }) => ({
      addOrganizationMember: (member, role) =>
        mutate({
          variables: { member, role, organization },
          refetchQueries: [
            { query: organizationalUnitQuery, variables: { id: organization } }
          ]
        })
    })
  }
);

export const removeOrganizationMemberMutation = gql`
  mutation RemoveOrganizationMember($organization: ID!, $member: ID!) {
    removeOrganizationMember(organization: $organization, member: $member)
  }
`;

export const withRemoveOrganizationMemberMutation = graphql(
  removeOrganizationMemberMutation,
  {
    props: ({ mutate, ownProps: { id: organization } }) => ({
      removeOrganizationMember: member =>
        mutate({
          variables: { member, organization },
          refetchQueries: [
            { query: organizationalUnitQuery, variables: { id: organization } }
          ]
        })
    })
  }
);
