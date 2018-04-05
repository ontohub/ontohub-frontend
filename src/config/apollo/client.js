import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { link } from "./links";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "OrganizationalUnit",
          possibleTypes: [{ name: "User" }, { name: "Organization" }]
        }
      ]
    }
  }
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    fragmentMatcher
  })
});
