import { gql } from 'react-apollo'

export const getVersionQuery = gql`
query GetVersionQuery {
  version {
    tag
    commitsSinceTag
  }
}
`

export default getVersionQuery
