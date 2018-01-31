import React, { Fragment } from "react";
import { Header as SemHeader, Container, Menu, Icon } from "semantic-ui-react";
import { NavLink as Link } from "react-router-dom";
import Gravatar from "react-gravatar";

export const Header = ({
  data: {
    loading,
    organizationalUnit: {
      __typename,
      description,
      displayName,
      emailHash,
      id,
      permissions: { role } = {}
    } = {}
  }
}) => (
  <Container>
    <SemHeader as="h2" inverted>
      {!loading && (
        <Fragment>
          {emailHash && (
            <Gravatar
              key="avatar"
              style={{ borderRadius: 2 }}
              size={100}
              md5={emailHash}
            />
          )}
          <SemHeader.Content key="content">
            {displayName ? (
              <Fragment>
                {displayName}
                <SemHeader.Subheader key="id">
                  {description || id}
                </SemHeader.Subheader>
              </Fragment>
            ) : (
              id
            )}
          </SemHeader.Content>
        </Fragment>
      )}
    </SemHeader>
    <Menu inverted pointing secondary>
      <Menu.Item as={Link} to={`/${id}/repositories`}>
        <Icon name="fork" />
        Repositories
      </Menu.Item>
      {__typename === "User" ? (
        <Menu.Item as={Link} to={`/${id}/organizations`}>
          <Icon name="users" />
          Organizations
        </Menu.Item>
      ) : (
        <Menu.Item as={Link} to={`/${id}/members`}>
          <Icon name="users" /> Members
        </Menu.Item>
      )}
      {role === "admin" && (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to={`/${id}/settings`}>
            <Icon name="settings" /> Settings
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  </Container>
);
