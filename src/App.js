import React, { Component } from "react";
import { graphql } from "react-apollo";
import { currentUserQuery } from "./apollo/queries";
import { Header } from "./components";
import { VersionWarning, GlobalMenu } from "./containers";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import config from "./config.json";

const backendVersion = config.ontohub.backendVersion;

class GraphQL extends Component {
  constructor(props) {
    super();
    const { query, render } = props;
    this.Comp = query(render);
  }
  componentWillReceiveProps(props) {
    this.Comp = props.query(props.render);
  }
  shouldComponentUpdate(props) {
    return props.update !== this.props.update;
  }
  render() {
    const Comp = this.Comp;
    return <Comp {...this.props} />;
  }
}

const meQuery = graphql(currentUserQuery);

const App = ({ me, ...props }) => (
  <div className={props.className}>
    <GlobalMenu me={me} />
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={1}
          path={route.path}
          exact={route.exact}
          render={routeProps => (
            <GraphQL
              {...routeProps}
              update={routeProps.location.key}
              query={route.graphql || meQuery}
              render={gqlProps => [
                <Header key="header">
                  <route.header
                    key="header"
                    me={me}
                    {...routeProps}
                    {...gqlProps}
                  />
                </Header>,
                <route.main key="main" me={me} {...routeProps} {...gqlProps} />
              ]}
            />
          )}
        />
      ))}
    </Switch>
    <VersionWarning requirement={backendVersion} />
  </div>
);

const StyledApp = styled(App)`
  position: relative;
  top: calc(${({ theme }) => theme.sizes.menuHeight} - 1px);
  margin-bottom: ${({ theme }) => theme.sizes.footerMargin};
`;

const AppWithData = graphql(currentUserQuery, {
  props: props => ({
    ...props.ownProps,
    loading: props.data.loading,
    error: props.data.error,
    me: props.data.me
  })
})(StyledApp);

export default AppWithData;
