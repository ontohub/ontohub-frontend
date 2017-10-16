import React from 'react'
import { Header as SemHeader, Container, Menu, Icon } from 'semantic-ui-react'
import { NavLink as Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import { get } from 'lodash'

export const Header = ({ data }) => (
  <Container>
    <SemHeader as="h2" inverted>
      {data.loading
        ? null
        : [
            get(data, 'organizationalUnit.emailHash') ? (
              <Gravatar
                key="avatar"
                style={{ borderRadius: 2 }}
                size={100}
                md5={get(data, 'organizationalUnit.emailHash')}
              />
            ) : null,
            <SemHeader.Content key="content">
              {get(data, 'organizationalUnit.displayName')
                ? [
                    get(data, 'organizationalUnit.displayName'),
                    <SemHeader.Subheader key="id">
                      {get(data, 'organizationalUnit.description') ||
                        get(data, 'organizationalUnit.id')}
                    </SemHeader.Subheader>
                  ]
                : get(data, 'organizationalUnit.id')}
            </SemHeader.Content>
          ]}
    </SemHeader>
    <Menu inverted pointing secondary>
      <Menu.Item
        as={Link}
        to={`/${get(data, 'organizationalUnit.id')}/repositories`}
      >
        <Icon name="fork" />
        Repositories
      </Menu.Item>
      {get(data, 'organizationalUnit.__typename') === 'User' ? (
        <Menu.Item
          as={Link}
          to={`/${get(data, 'organizationalUnit.id')}/organizations`}
        >
          <Icon name="users" />
          Organizations
        </Menu.Item>
      ) : (
        <Menu.Item
          as={Link}
          to={`/${get(data, 'organizationalUnit.id')}/members`}
        >
          <Icon name="users" /> Members
        </Menu.Item>
      )}
      {get(data, 'organizationalUnit.__typename') === 'Organization' &&
      get(data, 'organizationalUnit.memberships[0].role') ? (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to={`/${get(data, 'organizationalUnit.id')}/settings`}
          >
            <Icon name="settings" /> Settings
          </Menu.Item>
        </Menu.Menu>
      ) : null}
    </Menu>
  </Container>
)

export default Header
