import React from "react";
import { graphql } from "react-apollo";
import { HeadAndBody } from "lib/head-and-body";
import { VersionWarning } from "scenes/global/version-warning";
import { currentUserQuery } from "config/apollo/queries";
import { GlobalMenu } from "scenes/global/global-menu";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { routes } from "config/routes";
import config from "../package.json";

const backendVersion = config.ontohub.backendVersion;

const App = ({ me, ...props }) => (
  <div className={props.className}>
    <GlobalMenu me={me} />
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={1}
          path={route.path}
          exact={route.exact}
          render={props => (
            <HeadAndBody
              hoc={route.graphql}
              me={me}
              head={route.header}
              body={route.main}
              {...props}
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

export { AppWithData as App };