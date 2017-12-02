import React from "react";
import { graphql } from "react-apollo";
import { currentUserQuery } from "./apollo/queries";
import { Header } from "./components";
import { VersionWarning, GlobalMenu } from "./containers";
import { Switch, Route } from "react-router-dom";
import styled from "react-emotion";
import routes from "./routes";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import config from "./config.json";

const backendVersion = config.ontohub.backendVersion;

const App = props => (
  <div className={props.className}>
    <GlobalMenu me={props.me} />
    <Header heightTransitionDuration=".4s" contentTransitionDuration=".1s">
      <Route
        render={({ location }) => (
          <ReactCSSTransitionReplace
            transitionName="cross-fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <Switch key={location.pathname} location={location}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.header}
                />
              ))}
            </Switch>
          </ReactCSSTransitionReplace>
        )}
      />
    </Header>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
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
