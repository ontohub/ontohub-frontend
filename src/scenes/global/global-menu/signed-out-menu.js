import React from "react";
import { Menu } from "semantic-ui-react";
import { LoginModal } from "./login-modal";

export const SignedOutMenu = ({ onSignUp, enableCaptcha }) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <LoginModal enableCaptcha={enableCaptcha} onSignUp={onSignUp} />
    </Menu.Item>
  </Menu.Menu>
);
