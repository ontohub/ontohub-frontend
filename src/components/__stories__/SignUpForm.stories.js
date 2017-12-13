import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ThemeProvider } from "styled-components";
import theme from "../../styles";
import { Icon, Input, Header as SemHeader, Menu } from "semantic-ui-react";
import { SignUpForm } from "../SignUpForm";

const Decorator = storyFn => (
  <div>
    {storyFn()}
    <p style={{ textAlign: "center" }}>
      This is a controlled component, so the field values will not change in
      this demo.
    </p>
  </div>
);

storiesOf("SignUpForm", module)
  .addDecorator(Decorator)
  .add("initial state", () => (
    <SignUpForm
      errors={{}}
      onSubmit={() => {}}
      onChange={action("change-field")}
      onError={() => {}}
      touched={{}}
      values={{
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
    />
  ))
  .add("displaying errors on touched fields", () => (
    <SignUpForm
      errors={{
        name: ["Username is already taken"],
        passwordScore: 3,
        confirmPassword: ["Passwords must match"]
      }}
      onSubmit={() => {}}
      onChange={action("change-field")}
      onError={() => {}}
      submitDisabled={true}
      touched={{ email: true, confirmPassword: true }}
      values={{
        name: "ada",
        email: "",
        password: "correcthorsebatterystaple",
        confirmPassword: ""
      }}
    />
  ));
