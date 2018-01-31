import React, { Fragment } from "react";
import { Container, Item, Icon } from "semantic-ui-react";
import { Header, OrganizationSettings } from "./components";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import Gravatar from "react-gravatar";

const OrganizationalUnit = ({
  data: {
    loading,
    organizationalUnit: {
      repositories,
      organizationMemberships,
      memberships
    } = {}
  } = {},
  me
}) => (
  <Fragment>
    <Route
      key="main-route-redirect"
      path="/:id"
      exact
      render={({ match: { params: { id } } }) => (
        <Redirect to={`/${id}/repositories`} />
      )}
    />
    {loading ? null : (
      <Container key="main-content" text>
        <Switch>
          <Route
            path="/:id/repositories"
            exact
            render={() => {
              return (
                <Item.Group divided>
                  {repositories.map(({ id, name, description, visibility }) => (
                    <Item key={id}>
                      <Item.Content>
                        <Item.Header>
                          <Link to={`/${id}`}>
                            {name}
                            {visibility === "private" && (
                              <Icon color="yellow" name="unlock alternate" />
                            )}
                          </Link>
                        </Item.Header>
                        <Item.Description>{description}</Item.Description>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              );
            }}
          />
          <Route
            path="/:id/organizations"
            exact
            render={() => {
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
              );
            }}
          />
          <Route
            path="/:id/members"
            exact
            render={() => {
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
              );
            }}
          />
          <Route
            path="/:id/settings"
            render={({ match: { url } }) => {
              return (
                <OrganizationSettings
                  me={me}
                  match={{ url }}
                  data={organizationalUnit}
                />
              );
            }}
          />
        </Switch>
      </Container>
    )}
  </Fragment>
);

export { Header, OrganizationalUnit };

export default OrganizationalUnit;
