import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { LoginModal } from "./LoginModal";
import Gravatar from "react-gravatar";
import styled from "styled-components";

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

const SignedOutMenu = ({
  onSignIn,
  onSignUp,
  signUpValidations,
  enableCaptcha
}) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <LoginModal
        enableCaptcha={enableCaptcha}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        signUpValidations={signUpValidations}
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
  signUpValidations,
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
          signUpValidations={signUpValidations}
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
`;

export default FixedGlobalMenu;
