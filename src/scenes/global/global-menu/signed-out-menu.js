import React from "react";
import { Menu } from "semantic-ui-react";
import { LoginModal } from "./login-modal";

export const SignedOutMenu = ({ onSignIn, onSignUp, enableCaptcha }) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <LoginModal
        enableCaptcha={enableCaptcha}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
      />
    </Menu.Item>
  </Menu.Menu>
);
