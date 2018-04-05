import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "config/apollo";
import { ThemeProvider } from "styled-components";
import theme from "config/theme";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
