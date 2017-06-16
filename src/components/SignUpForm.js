import React, { Component } from 'react'
import zxcvbn from 'zxcvbn'
import { validate } from '../helpers/validations'
import { Button, Form, Label, Progress } from 'semantic-ui-react'
import _ from 'lodash'

const PasswordStrengthBar = ({ score }) =>
  <Progress
    attached="bottom"
    title={`Password strength: ${[
      'Very weak',
      'Weak',
      'Okay',
      'Strong',
      'Very strong'
    ][score]}`}
    style={{ marginTop: -3 }}
    percent={score * 25}
    color={['red', 'orange', 'yellow', 'olive', 'green'][score]}
  />

export class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.fields = {}
    this.state = {
      passwordScore: 0,
      errors: {}
    }
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  fieldValues() {
    return _.mapValues(this.fields, (f) => f && f.value)
  }
  onSubmit(e) {
    e.preventDefault()
    let fieldValues = this.fieldValues(),
        validationErrors = validate(this.props.validations, fieldValues)
    return validationErrors.then((errors) => {
      this.setState({
        errors: errors
      })

      if (Object.keys(errors).length === 0) {
        return this.props
          .onSubmit(fieldValues)
          .then(this.props.onSuccess, this.props.onError)
      } else {
        return this.props.onError()
      }
    })
  }
  validateField(fieldName) {
    return _.debounce(
      (e) =>
        validate(
          this.props.validations,
          this.fieldValues(),
          fieldName
        ).then((errors) => {
          if (this._isMounted) {
            this.setState((state) => ({
              ...state,
              errors: { ...state.errors, ...errors }
            }))
          }
        }),
      300
    )
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.username}>
            <label htmlFor="sign-up-username">Username</label>
            <input
              ref={(input) => (this.fields.username = input)}
              onKeyPress={this.validateField('username')}
              onBlur={this.validateField('username')}
              placeholder="Username"
              id="sign-up-username"
            />
            {this.state.errors.username &&
              <Label pointing color="red">
                {this.state.errors.username.map((e, i) =>
                  <div key={i}>{e}</div>
                )}
              </Label>}
          </Form.Field>
          <Form.Field error={!!this.state.errors.email}>
            <label htmlFor="sign-up-email">Email</label>
            <input
              ref={(input) => (this.fields.email = input)}
              onKeyPress={this.validateField('email')}
              onBlur={this.validateField('email')}
              placeholder="Email"
              id="sign-up-email"
            />
            {this.state.errors.email &&
              <Label pointing color="red">
                {this.state.errors.email.map((e, i) => <div key={i}>{e}</div>)}
              </Label>}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.password}>
            <label htmlFor="sign-up-password">Password</label>
            <input
              type="password"
              ref={(input) => (this.fields.password = input)}
              onKeyPress={this.validateField(['password', 'passwordConfirm'])}
              onBlur={this.validateField(['password', 'passwordConfirm'])}
              onChange={(e) => {
                let score = zxcvbn(e.target.value).score
                this.setState({
                  passwordScore: score
                })
              }}
              placeholder="Password"
              id="sign-up-password"
            />
            <PasswordStrengthBar score={this.state.passwordScore} />
            {this.state.errors.password &&
              <Label pointing color="red">
                {this.state.errors.password.map((e, i) =>
                  <div key={i}>{e}</div>
                )}
              </Label>}
          </Form.Field>
          <Form.Field error={!!this.state.errors.passwordConfirm}>
            <label htmlFor="sign-up-password-confirm">Confirm Password</label>
            <input
              type="password"
              ref={(input) => (this.fields.passwordConfirm = input)}
              onKeyPress={this.validateField('passwordConfirm')}
              onBlur={this.validateField('passwordConfirm')}
              placeholder="Confirm Password"
              id="sign-up-password-confirm"
            />
            {this.state.errors.passwordConfirm &&
              <Label pointing color="red">
                {this.state.errors.passwordConfirm.map((e, i) =>
                  <div key={i}>{e}</div>
                )}
              </Label>}
          </Form.Field>
        </Form.Group>
        <Button
          basic
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
