import { gql } from 'react-apollo'

export const versionQuery = gql`
query GetVersion {
  version {
    tag
    commitsSinceTag
  }
}
`

export default versionQuery
