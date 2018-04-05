import React from "react";
import { signUpMutation } from "config/apollo/queries";
import { compose, graphql, withApollo } from "react-apollo";
import { signIn, signOut } from "lib/session";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { SignedInMenu } from "./global-menu/signed-in-menu";
import { SignedOutMenu } from "./global-menu/signed-out-menu";
import styled from "styled-components";

const enableCaptcha = process.env.REACT_APP_DISABLE_CAPTCHA !== "true";

const InnerMenu = styled(Menu)`
  height: ${({ theme }) => theme.sizes.menuHeight};
  width: ${({ theme }) => theme.sizes.contentWidth} !important;
  position: relative !important;
`;

const GlobalMenu = ({
  loading,
  error,
  me,
  enableCaptcha,
  onSignIn,
  onSignOut,
  onSignUp,
  className
}) => (
  <div className={className}>
    <InnerMenu inverted borderless fixed="top">
      <Menu.Item header as={Link} to="/">
        Ontohub
      </Menu.Item>
      {(me && <SignedInMenu me={me} onSignOut={onSignOut} />) || (
        <SignedOutMenu
          enableCaptcha={enableCaptcha}
          onSignIn={onSignIn}
          onSignUp={onSignUp}
        />
      )}
    </InnerMenu>
  </div>
);

const FixedGlobalMenu = styled(GlobalMenu)`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.dark};
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 99999999;
`;

const GlobalMenuWithData = compose(
  withApollo,
  graphql(signUpMutation, {
    props: props => ({
      ...props.ownProps,
      client: undefined,
      enableCaptcha: enableCaptcha,
      onSignUp: (username, email, password, captcha) =>
        props
          .mutate({
            variables: { user: { username, email, password }, captcha }
          })
          .then(response => {
            const signUpData = response.data.signUp;
            if (signUpData) {
              return signIn(props.ownProps.client, signUpData.jwt);
            } else {
              throw new Error("Sign up failed");
            }
          }),
      onSignOut: () => signOut(props.ownProps.client)
    })
  })
)(FixedGlobalMenu);

export { FixedGlobalMenu as PureGlobalMenu, GlobalMenuWithData as GlobalMenu };
