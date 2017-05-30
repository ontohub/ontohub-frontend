export const typeDefs = `
type BackendVersion {
  # The full version string in the format ':tag-:commitsSinceTag-commit'
  full: String!
  tag: String!
  commitsSinceTag: Int!
  commit: String!
}

type Query {
  version: BackendVersion!
}

schema {
  query: Query
}
`

export default typeDefs
