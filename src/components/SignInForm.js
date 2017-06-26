import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

export class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event) {
    event.preventDefault()
    return this.props.onSubmit(this.username.value, this.password.value).then(
      () => {
        this.setState({ error: false })
        this.props.onSuccess()
      },
      () => {
        this.setState({ error: true })
        this.props.onError()
      }
    )
  }
  render() {
    return (
      <Form error={this.state.error} onSubmit={this.onSubmit}>
        {this.state.error &&
          <Message
            error
            icon="warning sign"
            header="Incorrect username or password"
          />}
        <Form.Group widths="equal">
          <Form.Field error={this.state.error}>
            <label htmlFor="sign-in-username">Username</label>
            <input
              defaultValue="ada"
              ref={(input) => (this.username = input)}
              placeholder="Username"
              id="sign-in-username"
            />
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label htmlFor="sign-in-password">Password</label>
            <input
              type="password"
              defaultValue="changemenow"
              ref={(input) => (this.password = input)}
              placeholder="Password"
              id="sign-in-password"
            />
          </Form.Field>
        </Form.Group>
        <Button
          type="submit"
          icon="sign in"
          content="Sign in"
          floated="right"
          primary
        />
      </Form>
    )
  }
}

export default SignInForm
