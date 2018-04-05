import React from "react";
import { signInMutation, signUpMutation } from "config/apollo/queries";
import { compose, graphql, withApollo } from "react-apollo";
import { signIn, signOut } from "lib/session";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { LoginModal } from "./login-modal";
import Gravatar from "react-gravatar";
import styled from "styled-components";

const enableCaptcha = process.env.REACT_APP_DISABLE_CAPTCHA !== "true";

const SignedInMenu = ({ me, onSignOut }) => (
  <Menu.Menu position="right">
    <Dropdown
      item
      trigger={
        <span>
          <Icon name="plus" />
        </span>
      }
    >
      <Dropdown.Menu>
        <Dropdown.Header>Create new...</Dropdown.Header>
        <Dropdown.Item as={Link} to="/new" content="Repository" />
        <Dropdown.Item
          as={Link}
          to="/organizations/new"
          content="Organization"
        />
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown
      item
      trigger={
        <span>
          <Gravatar style={{ borderRadius: 2 }} size={24} md5={me.emailHash} />
        </span>
      }
    >
      <Dropdown.Menu>
        <Dropdown.Header>Signed in as {me.id}</Dropdown.Header>
        <Dropdown.Item as={Link} to={`/${me.id}`} content="Profile" />
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={onSignOut}
          content="Sign out"
          id="global-menu-sign-out-button"
        />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>
);

const SignedOutMenu = ({ onSignIn, onSignUp, enableCaptcha }) => (
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
  graphql(signInMutation, {
    props: props => ({
      ...props.ownProps,
      onSignIn: (username, password) =>
        props
          .mutate({
            variables: { username, password }
          })
          .then(response => {
            const signInData = response.data.signIn;
            if (signInData) {
              return signIn(props.ownProps.client, signInData.jwt);
            } else {
              throw new Error("Sign in failed");
            }
          })
    })
  }),
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
