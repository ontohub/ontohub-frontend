import React, { Component } from 'react'
import zxcvbn from 'zxcvbn'
import _ from 'lodash'
import Client from '../apollo/client'
import validate from '../helpers/validations'
import { gql } from 'react-apollo'
import { Button, Form, Label, Progress } from 'semantic-ui-react'

const validations = [
  {
    validate: ({ username }) => username.length >= 3,
    field: 'username',
    text: 'Username must be at least 3 characters long'
  },
  {
    validate: ({ username }) => /^[a-z0-9][a-z0-9-]*$/.test(username),
    field: 'username',
    text: 'Username must consist of a-z, A-Z, 0-9, -'
  },
  {
    validate: ({ username }) =>
      Client.query({
        query: gql`query FetchUser($id: ID!) { organizationalUnit(id: $id) { id } }`,
        variables: {
          id: username
        }
      }).then((resp) => !resp.data.organizationalUnit),
    field: 'username',
    text: 'Username is already taken'
  },
  {
    validate: ({ email }) => /^[^@]+@[^@]+$/.test(email),
    field: 'email',
    text: 'Email address must be valid'
  },
  {
    validate: ({ password }) => password.length >= 10,
    field: 'password',
    text: 'Password must be at least 10 characters long'
  },
  {
    validate: ({ password, passwordConfirm }) => password === passwordConfirm,
    field: 'passwordConfirm',
    text: 'Passwords must be equal'
  }
]

export class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordScore: 0,
      error: false,
      errors: {}
    }
  }
  onSubmit(e) {
    e.preventDefault()
    let fieldValues = {
          username: this.username.value,
          email: this.email.value,
          password: this.password.value,
          passwordConfirm: this.passwordConfirm.value
        },
        errors = validate(validations, fieldValues)
    errors.then((errors) => {
      this.setState({
        errors: errors
      })

      if (errors === {}) {
        return this.props.onSubmit(fieldValues).then(
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
    })
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.username}>
            <label htmlFor="sign-up-username">Username</label>
            <input
              ref={(input) => (this.username = input)}
              placeholder="Username"
              id="sign-up-username"
            />
            {this.state.errors.username &&
              <Label pointing color="red">
                {this.state.errors.username.map((e) => <div>{e}</div>)}
              </Label>}
          </Form.Field>
          <Form.Field error={!!this.state.errors.email}>
            <label htmlFor="sign-up-email">Email</label>
            <input
              ref={(input) => (this.email = input)}
              placeholder="Email"
              id="sign-up-email"
            />
            {this.state.errors.email &&
              <Label pointing color="red">
                {this.state.errors.email.map((e) => <div>{e}</div>)}
              </Label>}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.password}>
            <label htmlFor="sign-up-password">Password</label>
            <input
              type="password"
              ref={(input) => (this.password = input)}
              onChange={(e) => {
                let score = zxcvbn(e.target.value).score
                this.setState({
                  passwordScore: score
                })
              }}
              placeholder="Password"
              id="sign-up-password"
            />
            <Progress
              attached="bottom"
              title={`Password strength: ${[
                'Very weak',
                'Weak',
                'Okay',
                'Strong',
                'Very strong'
              ][this.state.passwordScore]}`}
              style={{ marginTop: -3 }}
              percent={this.state.passwordScore * 25}
              color={
                ['red', 'orange', 'yellow', 'olive', 'green'][
                  this.state.passwordScore
                ]
              }
            />
            {this.state.errors.password &&
              <Label pointing color="red">
                {this.state.errors.password.map((e) => <div>{e}</div>)}
              </Label>}
          </Form.Field>
          <Form.Field error={!!this.state.errors.passwordConfirm}>
            <label htmlFor="sign-up-password-confirm">Confirm Password</label>
            <input
              type="password"
              ref={(input) => (this.passwordConfirm = input)}
              placeholder="Confirm Password"
              id="sign-up-password-confirm"
            />
            {this.state.errors.passwordConfirm &&
              <Label pointing color="red">
                {this.state.errors.passwordConfirm.map((e) => <div>{e}</div>)}
              </Label>}
          </Form.Field>
        </Form.Group>
        <Button
          type="submit"
          icon="add user"
          content="Create account"
          floated="right"
          secondary
        />
      </Form>
    )
  }
}

export default SignUpForm
