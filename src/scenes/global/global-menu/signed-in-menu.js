import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import Gravatar from "react-gravatar";

export const SignedInMenu = ({ me, onSignOut }) => (
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
