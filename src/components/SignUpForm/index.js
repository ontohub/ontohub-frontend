import React from "react";
import { Formik } from "formik";
import { Button, Form, Label, Progress } from "semantic-ui-react";
import { formHasError, validate, setServerErrors } from "./validation";
import ReCAPTCHA from "react-google-recaptcha";

const grecaptchaSiteKey = process.env.REACT_APP_GRECAPTCHA_SITE_KEY;

let captcha;
let formValues;
let _setErrors;
let _setSubmitting;

const defaultInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Field = ({
  touched,
  errors,
  innerId,
  name,
  label,
  onBlur,
  onChange,
  value,
  type,
  bar
}) => (
  <Form.Field error={!!touched && !!errors}>
    <label htmlFor={innerId}>{label}</label>
    <input
      onChange={onChange}
      onBlur={onBlur}
      placeholder={label}
      id={innerId}
      name={name}
      value={value}
      type={type}
    />
    {!!bar && bar()}
    {!!touched &&
      !!errors && (
        <Label pointing color="red">
          {errors.map(e => <div key={e}>{e}</div>)}
        </Label>
      )}
  </Form.Field>
);

export const SignUpForm = ({
  onSubmit,
  onError,
  enableCaptcha,
  initialValues,
  validationCallback
}) => {
  initialValues = initialValues || defaultInitialValues;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        formValues = values;
        if (captcha) {
          captcha.reset();
          captcha.execute();
        }
        if (!enableCaptcha) {
          onSubmit({ ...formValues, captcha: "skip" }).catch(
            setServerErrors(_setErrors, _setSubmitting, onError)
          );
        }
      }}
      validateOnChange={true}
      validate={(...args) => {
        let errors = validate(...args);
        if (validationCallback) {
          validationCallback(errors);
        }
        return errors;
      }}
      render={({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setErrors,
        setFieldTouched,
        setSubmitting,
        touched,
        values
      }) => {
        _setErrors = setErrors;
        _setSubmitting = setSubmitting;
        const handleTouchedChange = field => (...args) => {
          setFieldTouched(field, true);
          return handleChange(...args);
        };
        return (
          <Form error={formHasError(errors)} onSubmit={handleSubmit}>
            {values !== initialValues && enableCaptcha ? (
              <ReCAPTCHA
                sitekey={grecaptchaSiteKey}
                ref={el => {
                  captcha = el;
                }}
                size="invisible"
                badge="bottomleft"
                onChange={captcha =>
                  onSubmit({ ...formValues, captcha }).catch(
                    setServerErrors(setErrors, setSubmitting, onError)
                  )
                }
              />
            ) : null}
            <Form.Group widths="equal">
              <Field
                innerId="sign-up-username"
                errors={errors.name}
                touched={touched.name}
                name="name"
                value={values.name}
                onChange={handleTouchedChange("name")}
                onBlur={handleBlur}
                label="Username"
              />
              <Field
                innerId="sign-up-email"
                errors={errors.email}
                touched={touched.email}
                name="email"
                value={values.email}
                onChange={handleTouchedChange("email")}
                onBlur={handleBlur}
                label="Email"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                innerId="sign-up-password"
                errors={errors.password}
                touched={touched.password}
                name="password"
                value={values.password}
                onChange={handleTouchedChange("password")}
                onBlur={handleBlur}
                label="Password"
                type="password"
                bar={() => (
                  <PasswordStrengthBar score={errors.passwordScore || 0} />
                )}
              />
              <Field
                innerId="sign-up-password-confirm"
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleTouchedChange("confirmPassword")}
                onBlur={handleBlur}
                label="Password confirmation"
                type="password"
              />
            </Form.Group>
            <Button
              basic
              type="submit"
              icon="add user"
              content="Create account"
              floated="right"
              secondary
              disabled={values === initialValues || formHasError(errors)}
            />
          </Form>
        );
      }}
    />
  );
};

const PasswordStrengthBar = ({ score }) => (
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

export default SignUpForm;
