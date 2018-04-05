import { ApolloLink } from "apollo-link";

export const link = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem("auth-token");
  operation.setContext({
    headers: {
      accept: "application/json",
      ...(authToken ? { authorization: `Bearer ${authToken}` } : null)
    }
  });
  return forward(operation);
});
