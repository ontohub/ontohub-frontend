import React from "react";
import { Field } from "lib/field";
import { PasswordStrengthBar } from "./sign-up-form/password-strength-bar";
import { withRefs } from "./sign-up-form/withRefs";
import { compose } from "recompose";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import { validate } from "./sign-up-form/validation";
import { setServerErrors } from "lib/validation";
import ReCAPTCHA from "react-google-recaptcha";
const grecaptchaSiteKey = process.env.REACT_APP_GRECAPTCHA_SITE_KEY;

export const PureSignUpForm = ({
  errors,
  onBlur,
  onChange,
  onSubmit,
  submitEnabled = true,
  touched,
  values,
  registerCaptcha,
  refs,
  setErrors,
  setSubmitting,
  onError
}) => (
  <Form onSubmit={submitEnabled ? onSubmit : undefined}>
    {initialValues !== values ? (
      <ReCAPTCHA
        sitekey={grecaptchaSiteKey}
        ref={registerCaptcha}
        size="invisible"
        badge="bottomleft"
        onChange={
          /* istanbul ignore next */ async captcha => {
            try {
              await onSubmit({ ...refs.values, captcha });
            } catch (e) {
              setServerErrors(setErrors, setSubmitting, onError);
            }
          }
        }
      />
    ) : null}
    <Form.Group widths="equal">
      <Field
        errors={errors.name}
        fieldId="sign-up-username"
        label="Username"
        name="name"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.name}
        value={values.name}
      />
      <Field
        errors={errors.email}
        fieldId="sign-up-email"
        label="Email"
        name="email"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.email}
        value={values.email}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        bar={<PasswordStrengthBar score={errors.passwordScore || 0} />}
        errors={errors.password}
        fieldId="sign-up-password"
        label="Password"
        name="password"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.password}
        type="password"
        value={values.password}
      />
      <Field
        errors={errors.confirmPassword}
        fieldId="sign-up-password-confirm"
        label="Password confirmation"
        name="confirmPassword"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.confirmPassword}
        type="password"
        value={values.confirmPassword}
      />
    </Form.Group>
    <Button
      basic
      type="submit"
      icon="add user"
      content="Create account"
      floated="right"
      secondary
      disabled={!submitEnabled}
    />
  </Form>
);

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

/* istanbul ignore next */
const FormikSignUpForm = ({
  enableCaptcha,
  onError,
  onSubmit,
  refs,
  registerCaptcha,
  setValues
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={async (values, { setErrors, setSubmitting }) => {
      if (refs.captcha && enableCaptcha) {
        refs.captcha.reset();
        refs.captcha.execute();
      } else {
        try {
          await onSubmit({ ...values, captcha: "skip" });
        } catch (e) {
          setServerErrors(setErrors, setSubmitting, onError);
        }
      }
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
    }) => (
      <PureSignUpForm
        errors={errors}
        onError={onError}
        setErrors={setErrors}
        setSubmitting={setSubmitting}
        refs={refs}
        onBlur={handleBlur}
        registerCaptcha={registerCaptcha}
        onChange={(e, ...args) => {
          const { name, value } = e.target;
          setFieldTouched(name, true);
          setValues({ ...refs.values, [name]: value });
          return handleChange(e, ...args);
        }}
        onSubmit={handleSubmit}
        submitEnabled={values !== initialValues}
        touched={touched}
        values={values}
      />
    )}
    validate={validate}
  />
);

const FormikSignUpFormWithRefs = compose(
  withRefs({ captcha: "registerCaptcha", values: "setValues" })
)(FormikSignUpForm);

export { FormikSignUpFormWithRefs as SignUpForm };
