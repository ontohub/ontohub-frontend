import React from "react";
import { ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";

const signOut = client => {
  localStorage.removeItem("auth-token");
  return client.resetStore();
};

const signIn = (client, token) => {
  if (token) {
    localStorage.setItem("auth-token", token);
    client.resetStore();
  }
};

const mutation = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      jwt
      __typename
    }
  }
`;

const SignIn = ({ username, password }) => (
  <Mutation mutation={mutation}>
    {(mutate, { data, loading, error, called }) => (
      <ApolloConsumer>
        {client => {
          if (!called && username && password) {
            mutate({ variables: { username, password } });
          } else if (called) {
            signIn(client, data.signIn.jwt);
          }
          return null;
        }}
      </ApolloConsumer>
    )}
  </Mutation>
);

const SignOut = () => (
  <ApolloConsumer>
    {client => {
      signOut(client);
      return null;
    }}
  </ApolloConsumer>
);

export { SignIn, SignOut, signIn, signOut, mutation };
