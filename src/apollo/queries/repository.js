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

export const repositoryQuery = gql`
  query repositoryQuery($id: ID!, $revision: ID) {
    repository(id: $id) {
      id
      description
      branches
      defaultBranch
      commit(revision: $revision) {
        lsFiles
        readme: file(path: "texts/ontohub.txt") {
          content
        }
      }
    }
  }
`;
