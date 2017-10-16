import React from 'react'
import { NavLink as Link, Route, Switch, Redirect } from 'react-router-dom'
import {
  Button,
  Container,
  Dropdown,
  Form,
  Grid,
  Header,
  Item,
  Menu,
  Table
} from 'semantic-ui-react'
import Gravatar from 'react-gravatar'

const membershipRoles = [
  { key: 'admin', value: 'admin', text: 'Admin' },
  { key: 'read', value: 'read', text: 'Read' },
  { key: 'write', value: 'write', text: 'Write' }
]

export const OrganizationSettings = ({
  match: { url },
  data: { id, displayName, description, memberships },
  ...props
}) => [
  <Route path={url} exact render={() => <Redirect to={`${url}/profile`} />} />,
  <Grid inverted>
    <Grid.Column width={5}>
      <Menu fluid vertical secondary pointing>
        <Menu.Item header>Organization Settings</Menu.Item>
        <Menu.Item as={Link} to={`${url}/profile`}>
          Profile
          <Menu.Menu>
            <Menu.Item>Name</Menu.Item>
            <Menu.Item>Description</Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item as={Link} to={`${url}/members`}>
          Members
        </Menu.Item>
      </Menu>
    </Grid.Column>
    <Grid.Column width={11}>
      <Container>
        <Switch>
          <Route
            path={`${url}/profile`}
            render={() => [
              <Header as="h3">Organization Profile</Header>,
              <Form>
                <Form.Input
                  label="Change display name"
                  placeholder={id}
                  defaultValue={displayName}
                />
                <Form.Input
                  label="Change description"
                  defaultValue={description}
                />
                <Button floated="right" positive>
                  Update profile
                </Button>
              </Form>
            ]}
          />
          <Route
            path={`${url}/members`}
            render={() => [
              <Header as="h3">Organization Members</Header>,
              <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Role</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {memberships.map(
                    ({ member: { id, displayName, emailHash }, role }) => (
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Gravatar
                              key="avatar"
                              style={{ borderRadius: 2 }}
                              size={50}
                              md5={emailHash}
                              className="image"
                            />
                            <Header.Content>
                              <Link to={`/${id}`}>{displayName || id}</Link>

                              {displayName ? (
                                <Header.Subheader>{id}</Header.Subheader>
                              ) : null}
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <Dropdown
                            basic
                            fluid
                            selection
                            options={membershipRoles}
                            defaultValue={role}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table>
            ]}
          />
        </Switch>
      </Container>
    </Grid.Column>
  </Grid>
]

export default OrganizationSettings
