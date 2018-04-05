import gql from "graphql-tag";
import { graphql } from "react-apollo";

export const versionQuery = gql`
  query GetVersion {
    version {
      tag
      commitsSinceTag
    }
  }
`;

export const withVersionQuery = graphql(versionQuery, {
  props: ({
    data: { loading, error, version: { tag, commitsSinceTag } = {} }
  }) => ({
    loading,
    error,
    version: `${tag}-${commitsSinceTag}`
  })
});

export default versionQuery;
