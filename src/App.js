import React from "react";
import { graphql } from "react-apollo";
import { HeadAndBody } from "./components";
import { currentUserQuery } from "./apollo/queries";
import { VersionWarning, GlobalMenu } from "./containers";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import config from "./config.json";

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

export default AppWithData;
