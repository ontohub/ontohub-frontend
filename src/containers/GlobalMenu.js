import { Client } from '../apollo/client'
import { currentUserQuery, signInMutation } from '../apollo/queries'
import { compose, graphql } from 'react-apollo'
import { GlobalMenu } from '../components'
import { userValidations } from '../helpers/validations'
import _ from 'lodash'

const signOut = () => {
  localStorage.removeItem('auth-token')
  Client.resetStore()
}

const GlobalMenuWithData = compose(
  graphql(currentUserQuery, {
    props: (props) => {
      if (props.data.error) {
        // Invalid user token
        signOut()
      }
      return {
        ...props,
        loading: _.get(props, 'data.loading'),
        error: _.get(props, 'data.error'),
        me: _.get(props, 'data.me')
      }
    }
  }),
  graphql(signInMutation, {
    props: (props) => ({
      ...props,
      signUpValidations: userValidations,
      onSignIn: (username, password) =>
        props
          .mutate({
            variables: { username, password }
          })
          .then((response) => {
            if (response.data.signIn) {
              localStorage.setItem('auth-token', response.data.signIn.token)
              Client.resetStore()
              return Promise.resolve()
            } else {
              return Promise.reject()
            }
          }),
      onSignOut: signOut
    })
  })
)(GlobalMenu)

export default GlobalMenuWithData
