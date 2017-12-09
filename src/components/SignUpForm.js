import React, { Component } from "react";
import { validate } from "../helpers/validations";
import { Button, Form, Label, Progress } from "semantic-ui-react";
import _ from "lodash";
import ReCAPTCHA from "react-google-recaptcha";

let captcha;
const grecaptchaSiteKey = process.env.REACT_APP_GRECAPTCHA_SITE_KEY,
  PasswordStrengthBar = ({ score }) => (
    <Progress
      attached="bottom"
      title={`Password strength: ${
        ["Very weak", "Weak", "Okay", "Strong", "Very strong"][score]
      }`}
      style={{ marginTop: -3 }}
      percent={score * 25}
      color={["red", "orange", "yellow", "olive", "green"][score]}
    />
  );

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.state = {
      passwordScore: 0,
      errors: {}
    };
    this.loadCaptcha = this.loadCaptcha.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitSetCaptcha = this.onSubmitSetCaptcha.bind(this);
    import("zxcvbn").then(fn => (this.calculatePasswordScore = fn));
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  fieldValues() {
    return _.mapValues(this.fields, f => f && f.value);
  }
  // istanbul ignore next
  calculatePasswordScore(password) {
    return { score: 0 };
  }
  loadCaptcha() {
    this.setState({ captchaLoaded: true });
  }
  onSubmit(event) {
    event.preventDefault();
    let fieldValues = this.fieldValues(),
      validationErrors = validate(this.props.validations, fieldValues);
    return validationErrors.then(errors => {
      this.setState({
        errors: errors
      });

      const erroredFields = _.filter(
        errors,
        field => Array.isArray(field) && field.length > 0
      );
      if (erroredFields.length === 0) {
        this.onSubmitExecuteCaptcha();
      } else {
        return this.props.onError();
      }
    });
  }
  onSubmitExecuteCaptcha() {
    // `captcha` will be set when the ReCAPTCHA component is inserted
    // istanbul ignore if
    if (captcha) {
      captcha.reset();
      // This calls onSubmitSetCaptcha with the token received by recaptcha
      captcha.execute();
    } else if (!this.props.enableCaptcha) {
      // Skip captcha verification and go right into the sign up call
      this.onSubmitSetCaptcha("skip");
    }
  }
  onSubmitSetCaptcha(token) {
    this.fields.captcha = { value: token };
    this.onSubmitWithCaptcha();
  }
  onSubmitWithCaptcha() {
    let username, email, password, captcha, fieldValues;
    fieldValues = this.fieldValues();
    username = fieldValues["username"];
    email = fieldValues["email"];
    password = fieldValues["password"];
    captcha = fieldValues["captcha"];
    return this.props
      .onSubmit(username, email, password, captcha)
      .then(this.props.onSuccess, this.props.onError);
  }
  validateField(fieldName) {
    return () =>
      validate(this.props.validations, this.fieldValues(), fieldName).then(
        errors => {
          if (this._isMounted) {
            this.setState(state => ({
              errors: { ...state.errors, ...errors }
            }));
          }
        }
      );
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit} onChange={this.loadCaptcha}>
        {this.props.enableCaptcha &&
          this.state.captchaLoaded && (
            <ReCAPTCHA
              ref={el => {
                // We disable captchas in the tests:
                // istanbul ignore next
                captcha = el;
              }}
              size="invisible"
              badge="bottomleft"
              sitekey={grecaptchaSiteKey}
              onChange={this.onSubmitSetCaptcha}
            />
          )}
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.username}>
            <label htmlFor="sign-up-username">Username</label>
            <input
              ref={input => (this.fields.username = input)}
              onChange={_.debounce(this.validateField("username"), 500)}
              onBlur={this.validateField("username")}
              placeholder="Username"
              id="sign-up-username"
            />
            {this.state.errors.username && (
              <Label pointing color="red">
                {this.state.errors.username.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={!!this.state.errors.email}>
            <label htmlFor="sign-up-email">Email</label>
            <input
              ref={input => (this.fields.email = input)}
              onChange={this.validateField("email")}
              onBlur={this.validateField("email")}
              placeholder="Email"
              id="sign-up-email"
            />
            {this.state.errors.email && (
              <Label pointing color="red">
                {this.state.errors.email.map((e, i) => <div key={i}>{e}</div>)}
              </Label>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field error={!!this.state.errors.password}>
            <label htmlFor="sign-up-password">Password</label>
            <input
              type="password"
              ref={input => (this.fields.password = input)}
              onBlur={this.validateField(["password", "passwordConfirm"])}
              onChange={event => {
                if (!event.no_validation) {
                  this.validateField(["password", "passwordConfirm"])();
                }
                let score = this.calculatePasswordScore(event.target.value)
                  .score;
                this.setState({
                  passwordScore: score
                });
              }}
              placeholder="Password"
              id="sign-up-password"
            />
            <PasswordStrengthBar score={this.state.passwordScore} />
            {this.state.errors.password && (
              <Label pointing color="red">
                {this.state.errors.password.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={!!this.state.errors.passwordConfirm}>
            <label htmlFor="sign-up-password-confirm">Confirm Password</label>
            <input
              type="password"
              ref={input => (this.fields.passwordConfirm = input)}
              onChange={this.validateField("passwordConfirm")}
              onBlur={this.validateField("passwordConfirm")}
              placeholder="Confirm Password"
              id="sign-up-password-confirm"
            />
            {this.state.errors.passwordConfirm && (
              <Label pointing color="red">
                {this.state.errors.passwordConfirm.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </Label>
            )}
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
    );
  }
}

export default SignUpForm;
