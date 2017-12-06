import gql from "graphql-tag";

export const lsFilesQuery = gql`
  query lsFiles($repository: ID!, $revision: ID!) {
    repository(id: $repository) {
      commit(revision: $revision) {
        lsFiles
      }
    }
  }
`;
