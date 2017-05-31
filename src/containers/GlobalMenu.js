import { currentUserQuery } from '../apollo/queries'
import { graphql } from 'react-apollo'
import { GlobalMenu } from '../components'
import _ from 'lodash'

const GlobalMenuWithData = graphql(currentUserQuery, {
  props: (props) => ({
    ...props,
    loading: _.get(props, 'data.loading'),
    error: _.get(props, 'data.error'),
    currentUser: _.get(props, 'data.currentUser')
  })
})(GlobalMenu)

export default GlobalMenuWithData
