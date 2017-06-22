import { currentUserQuery, signInMutation } from '../apollo/queries'
import { compose, graphql, withApollo } from 'react-apollo'
import { GlobalMenu } from '../components'
import { userValidations } from '../helpers/validations'
import _ from 'lodash'

const signOut = (client) => () => {
  localStorage.removeItem('auth-token')
  return client.resetStore()
}
const signIn = (client, token) => {
  localStorage.setItem('auth-token', token)
  client.resetStore()
}

const GlobalMenuWithData = compose(
  withApollo,
  graphql(currentUserQuery, {
    props: (props) => {
      if (
        !_.get(props, 'data.error.networkError') &&
        (props.data.error || (!props.data.me && !props.data.loading))
      ) {
        // Invalid user token
        signOut(props.ownProps.client)()
      }
      return {
        ...props.ownProps,
        loading: _.get(props, 'data.loading'),
        error: _.get(props, 'data.error'),
        me: _.get(props, 'data.me')
      }
    }
  }),
  graphql(signInMutation, {
    props: (props) => ({
      ...props.ownProps,
      client: undefined,
      signUpValidations: userValidations(props.ownProps.client),
      onSignIn: (username, password) =>
        props
          .mutate({
            variables: { username, password }
          })
          .then((response) => {
            if (response.data.signIn) {
              return signIn(props.ownProps.client, response.data.signIn.token)
            } else {
              throw new Error('Sign in failed')
            }
          }),
      onSignOut: signOut(props.ownProps.client)
    })
  })
)(GlobalMenu)

export default GlobalMenuWithData
