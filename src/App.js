import React from "react";
import { graphql } from "react-apollo";
import { currentUserQuery } from "./apollo/queries";
import { Header } from "./components";
import { VersionWarning, GlobalMenu } from "./containers";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import config from "./config.json";

const backendVersion = config.ontohub.backendVersion;

injectGlobal`
.fade-wait-leave {
  opacity: 1;
}
.fade-wait-leave.fade-wait-leave-active {
  opacity: 0;
  transition: opacity .2s ease-in .1s;
}

.fade-wait-enter {
  opacity: 0;
}
.fade-wait-enter.fade-wait-enter-active {
  opacity: 1;
  /* Delay the enter animation until the leave completes */
  transition: opacity .1s ease-in .1s;
}

.fade-wait-height {
  transition: height .2s ease-in-out .1s;
}
`;

class RouteManager extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { loading: true } };
    this.update = this.update.bind(this);
  }
  update(props) {
    this.setState(props);
  }
  render() {
    return this.props.render(this.state, this.update);
  }
}

class GraphqlConnected extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      !!this.props.data &&
      !!this.props.data.loading &&
      (!nextProps.data || !nextProps.data.loading)
    );
  }
  render() {
    this.props.update(this.props);
    return null;
  }
}

const App = ({ me, ...props }) => (
  <div className={props.className}>
    <GlobalMenu me={me} />
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={1}
          path={route.path}
          exact={route.exact}
          render={routeProps => {
            let Comp = route.graphql
              ? route.graphql(GraphqlConnected)
              : graphql(currentUserQuery, { skip: true })(GraphqlConnected);
            return (
              <RouteManager
                render={(gqlProps, update) => (
                  <div>
                    <Comp {...routeProps} update={update} />
                    <Header>
                      <ReactCSSTransitionReplace
                        transitionName="fade-wait"
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
                      >
                        {route.header ? (
                          <route.header
                            key={routeProps.location.key}
                            me={me}
                            {...routeProps}
                            {...gqlProps}
                          />
                        ) : null}
                      </ReactCSSTransitionReplace>
                    </Header>
                    <ReactCSSTransitionReplace
                      transitionName="fade-wait"
                      transitionEnterTimeout={400}
                      transitionLeaveTimeout={400}
                    >
                      <route.main
                        key={routeProps.location.key}
                        me={me}
                        {...routeProps}
                        {...gqlProps}
                      />
                    </ReactCSSTransitionReplace>
                  </div>
                )}
              />
            );
          }}
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
