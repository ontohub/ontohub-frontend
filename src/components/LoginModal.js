import React, { Component } from 'react'
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Menu,
  Modal
} from 'semantic-ui-react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      loading: false
    }
  }
  onSignInSubmit(username, password) {
    this.setState({ loading: true })
    return this.props.onSignIn(username, password)
  }
  onSignUpSubmit(username, password) {
    this.setState({ loading: true })
    return new Promise((res, rej) => setTimeout(res, 2000))
  }
  onError() {
    this.setState({ loading: false })
  }
  onClose() {
    this.setState({ open: false })
  }
  onOpen() {
    this.setState({ open: true })
  }
  render() {
    return (
      <Modal
        size="small"
        dimmer="inverted"
        open={this.state.open}
        closeIcon
        trigger={<Button primary icon="sign in" content="Sign in" />}
      >
        <Modal.Header>Sign in</Modal.Header>
        <Modal.Content>
          <Dimmer inverted active={this.state.loading}>
            <Loader />
          </Dimmer>
          <Grid celled="internally" stackable divided>
            <Grid.Row>
              <Grid.Column>
                <SignInForm
                  onSubmit={this.onSignInSubmit.bind(this)}
                  onSuccess={this.onClose.bind(this)}
                  onError={this.onError.bind(this)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header textAlign="center">
                  Don't have an account yet? Sign up now!
                </Header>
                <SignUpForm
                  validations={this.props.signUpValidations}
                  onSubmit={this.onSignUpSubmit.bind(this)}
                  onSuccess={this.onClose.bind(this)}
                  onError={this.onError.bind(this)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

export default LoginModal
