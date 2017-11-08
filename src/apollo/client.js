import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import link from "./links";

export const Client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default Client;
