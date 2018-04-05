import React from "react";
import { HeadAndBody } from "lib/head-and-body";
import { VersionWarning } from "scenes/global/version-warning";
import { GlobalMenu } from "scenes/global/global-menu";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { routes } from "config/routes";
import config from "../package.json";
import { MeProvider } from "scenes/global/me";

const backendVersion = config.ontohub.backendVersion;

const App = props => (
  <MeProvider>
    <div className={props.className}>
      <GlobalMenu />
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={1}
            path={route.path}
            exact={route.exact}
            render={props => (
              <HeadAndBody
                hoc={route.graphql}
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
  </MeProvider>
);

const StyledApp = styled(App)`
  position: relative;
  top: calc(${({ theme }) => theme.sizes.menuHeight} - 1px);
  margin-bottom: ${({ theme }) => theme.sizes.footerMargin};
`;

export { StyledApp as App };
