import {
  currentUserQuery,
  signInMutation,
  signUpMutation
} from '../apollo/queries'
import { compose, graphql, withApollo } from 'react-apollo'
import { GlobalMenu } from '../components'
import { userValidations } from '../helpers/validations'
import _ from 'lodash'

const enableCaptcha = process.env.REACT_APP_DISABLE_CAPTCHA !== 'true'

const signOut = (client) => () => {
  localStorage.removeItem('auth-token')
  localStorage.removeItem('me')
  return client.resetStore()
}
const signIn = (client, token, me) => {
  if (token) {
    localStorage.setItem('auth-token', token)
    localStorage.setItem('me', me)
    client.resetStore()
  }
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
        loading: props.data.loading,
        error: props.data.error,
        me: props.data.me
      }
    }
  }),
  graphql(signInMutation, {
    props: (props) => ({
      ...props.ownProps,
      onSignIn: (username, password) =>
        props
          .mutate({
            variables: { username, password }
          })
          .then((response) => {
            const signInData = response.data.signIn
            if (signInData) {
              return signIn(
                props.ownProps.client,
                signInData.jwt,
                signInData.me
              )
            } else {
              throw new Error('Sign in failed')
            }
          }),
      onSignOut: signOut(props.ownProps.client)
    })
  }),
  graphql(signUpMutation, {
    props: (props) => ({
      ...props.ownProps,
      client: undefined,
      signUpValidations: userValidations(props.ownProps.client),
      enableCaptcha: enableCaptcha,
      onSignUp: (username, email, password, captcha) => props
        .mutate({
          variables: { user: { username, email, password }, captcha }
        })
        .then((response) => {
          const signUpData = response.data.signUp
          if (signUpData) {
            return signIn(
              props.ownProps.client,
              signUpData.jwt,
              signUpData.me
            )
          } else {
            throw new Error('Sign up failed')
          }
        }),
      onSignOut: signOut(props.ownProps.client)
    })
  })
)(GlobalMenu)

export default GlobalMenuWithData
