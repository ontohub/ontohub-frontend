import gql from "graphql-tag";

export const versionQuery = gql`
  query GetVersion {
    version {
      tag
      commitsSinceTag
    }
  }
`;

export default versionQuery;
