import { versionQuery } from '../apollo/queries'
import { graphql } from 'react-apollo'
import { VersionWarning } from '../components'
import _ from 'lodash'

const VersionWarningWithData = graphql(versionQuery, {
  props: (props) => ({
    loading: props.data.loading,
    error: props.data.error,
    version: _.at(props, [
      'data.version.tag',
      'data.version.commitsSinceTag'
    ]).join('-'),
    requirement: props.ownProps.requirement
  })
})(VersionWarning)

export default VersionWarningWithData
