import React, { Component } from "react";
import { Button, Dimmer, Grid, Header, Loader, Modal } from "semantic-ui-react";
import { SignInForm } from "./login-modal/sign-in-form";
import { SignUpForm } from "./login-modal/sign-up-form";

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      loading: false
    };
  }

  onSignUpSubmit = ({ name, email, password, captcha }) => {
    this.onStartSubmit();
    return this.props.onSignUp(name, email, password, captcha);
  };
  onSignInSubmit = () => {
    this.setState({ loading: true });
    return Promise.resolve();
  };
  onStartSubmit = () => {
    this.setState({ loading: true });
  };
  onError = () => {
    this.setState({ loading: false });
  };
  onClose = () => {
    this.setState({ open: false });
  };
  onOpen = () => {
    this.setState({ open: true });
  };
  render() {
    return (
      <Modal
        size="small"
        open={this.state.open}
        closeIcon
        style={{
          overflow: "hidden",
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto"
        }}
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
                  onSuccess={this.onClose}
                  onError={this.onError}
                  onSubmit={this.onSignInSubmit}
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
                  onSubmit={this.onSignUpSubmit}
                  onStartSubmit={this.onStartSubmit}
                  onSuccess={this.onClose}
                  onError={this.onError}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
