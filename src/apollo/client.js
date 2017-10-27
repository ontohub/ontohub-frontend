import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BatchHttpLink } from "apollo-link-batch-http";
import { onError } from "apollo-link-error";
import _ from "lodash";
import { signOut } from "../helpers/session";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

const networkInterface = createBatchingNetworkInterface({
  uri: `${backendHost}/graphql`,
  batchInterval: 10
});

const batchHttpLink = new BacthHttpLink({
  uri: `${backendHost}/graphql`
});

const headerLink = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem("auth-token");
  operation.setContext({
    headers: {
      authorization: `Bearer ${authToken}`,
      accept: "application/json"
    }
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  console.log(networkError);
});

const link = errorLink.concat(headerLink.concat(batchHttpLink));

export const Client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default Client;
