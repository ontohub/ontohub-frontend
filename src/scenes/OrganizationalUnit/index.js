import React from 'react'
import { Container, Item, Icon } from 'semantic-ui-react'
import { Header, OrganizationSettings } from './components'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Gravatar from 'react-gravatar'

const OrganizationalUnit = props => [
  <Route
    key="main-route-redirect"
    path="/:id"
    exact
    render={({ match: { params: { id } } }) => (
      <Redirect to={`/${id}/repositories`} />
    )}
  />,
  props.data.loading ? null : (
    <Container key="main-content" text>
      <Switch>
        <Route
          path="/:id/repositories"
          exact
          render={() => {
            console.log(props)
            const { data: { organizationalUnit: { repositories } } } = props
            return (
              <Item.Group divided>
                {repositories.map(({ id, name, description, visibility }) => (
                  <Item key={id}>
                    <Item.Content>
                      <Item.Header>
                        <Link to={`/${id}`}>
                          {name}
                          {visibility === 'private' && (
                            <Icon color="yellow" name="unlock alternate" />
                          )}
                        </Link>
                      </Item.Header>
                      <Item.Description>{description}</Item.Description>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            )
          }}
        />
        <Route
          path="/:id/organizations"
          exact
          render={() => {
            const {
              data: { organizationalUnit: { organizationMemberships } }
            } = props
            return (
              <Item.Group divided>
                {organizationMemberships.map(
                  ({ organization: { id, displayName, description } }) => (
                    <Item key={id}>
                      <Item.Content>
                        <Item.Header>
                          <Link to={`/${id}`}>{displayName || id}</Link>
                        </Item.Header>
                        <Item.Description>{description}</Item.Description>
                      </Item.Content>
                    </Item>
                  )
                )}
              </Item.Group>
            )
          }}
        />
        <Route
          path="/:id/members"
          exact
          render={() => {
            const { data: { organizationalUnit: { memberships } } } = props
            return (
              <Item.Group divided>
                {memberships.map(
                  ({ member: { id, displayName, emailHash } }) => (
                    <Item key={id}>
                      <div className="ui image">
                        <Gravatar
                          key="avatar"
                          style={{ borderRadius: 2 }}
                          size={60}
                          md5={emailHash}
                          className="image"
                        />
                      </div>
                      <Item.Content verticalAlign="middle">
                        <Item.Header>
                          <Link to={`/${id}`}>{displayName || id}</Link>
                        </Item.Header>
                        {displayName ? <Item.Meta>{id}</Item.Meta> : null}
                      </Item.Content>
                    </Item>
                  )
                )}
              </Item.Group>
            )
          }}
        />
        <Route
          path="/:id/settings"
          render={({ match: { url } }) => {
            const { data: { organizationalUnit } } = props
            return (
              <OrganizationSettings match={{ url }} data={organizationalUnit} />
            )
          }}
        />
      </Switch>
    </Container>
  )
]

export { Header, OrganizationalUnit }

export default OrganizationalUnit
