export const typeDefs = `
type BackendVersion {
  full: String!
  tag: String!
  commitsSinceTag: Int!
  commit: String!
}

type User {
  id: ID!
  email: String
  emailHash: String!
}

type Session {
  token: ID!
  userId: ID!
  user: User!
}

type Query {
  version: BackendVersion!
  currentUser: User
  user(id: ID!): User
}

type Mutation {
  signIn(username: String!, password: String!): Session
}

schema {
  query: Query
  mutation: Mutation
}
`

export default typeDefs
