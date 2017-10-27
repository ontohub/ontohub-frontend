import React from "react";
import { Formik } from "formik";
import { Button, Form, Message } from "semantic-ui-react";

export const SignInForm = ({ onSubmit, onSuccess, onError }) => (
  <Formik
    initialValues={{
      username: "ada",
      password: "changemenow"
    }}
    onSubmit={(values, { setErrors }) => {
      onSubmit(values.username, values.password).then(
        () => {
          onSuccess();
        },
        () => {
          setErrors({ password: "Incorrect username or password" });
          onError();
        }
      );
    }}
    render={({ values, errors, handleChange, handleSubmit }) => (
      <Form error={!!errors.password} onSubmit={handleSubmit}>
        <Message error icon="warning sign" header={errors.password} />
        <Form.Group widths="equal">
          <Form.Field error={!!errors.password}>
            <label htmlFor="sign-in-username">Username</label>
            <input
              name="username"
              id="sign-in-username"
              type="text"
              onChange={handleChange}
              value={values.username}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label htmlFor="sign-in-password">Password</label>
            <input
              name="password"
              id="sign-in-password"
              type="password"
              onChange={handleChange}
              value={values.password}
              placeholder="Password"
            />
          </Form.Field>
        </Form.Group>
        <Button
          type="submit"
          id="sign-in-form-sign-in-button"
          icon="sign in"
          content="Sign in"
          floated="right"
          primary
        />
      </Form>
    )}
  />
);

export default SignInForm;
