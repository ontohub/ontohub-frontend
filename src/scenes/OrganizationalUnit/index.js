import React from 'react'
import { Container, Item, Icon } from 'semantic-ui-react'
import { Header } from './components'
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
            const { data: { organizationalUnit: { repositories } } } = props
            return (
              <Item.Group divided>
                {repositories.map(({ id, name, description, visibility }) => (
                  <Item key={id}>
                    <Item.Content>
                      <Item.Header as={Link} to={`/${id}`}>
                        {name}
                        {visibility === 'private' && (
                          <Icon color="yellow" name="unlock alternate" />
                        )}
                      </Item.Header>
                      <Item.Extra>{description}</Item.Extra>
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
            const { data: { organizationalUnit: { organizations } } } = props
            return (
              <Item.Group divided>
                {organizations.map(({ id, displayName, description }) => (
                  <Item key={id}>
                    <Item.Content>
                      <Item.Header as={Link} to={`/${id}`}>
                        {displayName}
                      </Item.Header>
                      <Item.Extra>{description}</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            )
          }}
        />
        <Route
          path="/:id/members"
          exact
          render={() => {
            const { data: { organizationalUnit: { members } } } = props
            return (
              <Item.Group divided>
                {members.map(({ id, displayName, emailHash }) => (
                  <Item key={id}>
                    <div className="ui tiny image">
                      <Gravatar
                        key="avatar"
                        style={{ borderRadius: 2 }}
                        size={50}
                        md5={emailHash}
                        className="image"
                      />
                    </div>
                    <Item.Content verticalAlign="middle">
                      <Item.Header as={Link} to={`/${id}`}>
                        {displayName || id}
                      </Item.Header>
                      {displayName ? <Item.Meta>{id}</Item.Meta> : null}
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            )
          }}
        />
      </Switch>
    </Container>
  )
]

export { Header, OrganizationalUnit }

export default OrganizationalUnit
