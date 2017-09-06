import React, { Component } from 'react'
import { Button, Dimmer, Grid, Header, Loader, Modal } from 'semantic-ui-react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      loading: false
    }
    this.onSignInSubmit = this.onSignInSubmit.bind(this)
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this)
    this.onError = this.onError.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onOpen = this.onOpen.bind(this)
  }
  onSignInSubmit(username, password) {
    this.setState({ loading: true })
    return this.props.onSignIn(username, password)
  }
  onSignUpSubmit(username, email, password, captcha) {
    this.setState({ loading: true })
    return this.props.onSignUp(username, email, password, captcha)
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
        open={this.state.open}
        closeIcon
        style={{ overflow: 'hidden' }}
        trigger={
          <Button
            primary
            icon="sign in"
            id="login-modal-sign-in-button"
            content="Sign in"
          />
        }
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
                  onSubmit={this.onSignInSubmit}
                  onSuccess={this.onClose}
                  onError={this.onError}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header textAlign="center">
                  Don't have an account yet? Sign up now!
                </Header>
                <SignUpForm
                  enableCaptcha={this.props.enableCaptcha}
                  validations={this.props.signUpValidations}
                  onSubmit={this.onSignUpSubmit}
                  onSuccess={this.onClose}
                  onError={this.onError}
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
