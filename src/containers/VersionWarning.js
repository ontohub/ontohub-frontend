import { getVersionQuery } from '../apollo/queries'
import { graphql } from 'react-apollo'
import VersionWarning from '../components/VersionWarning'
import _ from 'lodash'

const VersionWarningWithData = graphql(getVersionQuery, {
  props: (props) => ({
    loading: _.get(props, 'data.loading'),
    version: _.at(props, [
      'data.version.tag',
      'data.version.commitsSinceTag'
    ]).join('-'),
    requirement: props.ownProps.requirement
  })
})(VersionWarning)

export default VersionWarningWithData
