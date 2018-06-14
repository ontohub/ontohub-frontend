import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const MeContext = React.createContext();

export const query = gql`
  query CurrentUser {
    me {
      id
      displayName
      email
      emailHash
      __typename
    }
  }
`;

export const MeProvider = ({ children }) => (
  <Query query={query}>
    {({ data, loading, error }) => {
      if (error || loading) return children;

      return (
        <MeContext.Provider value={!loading && !error && data.me}>
          {children}
        </MeContext.Provider>
      );
    }}
  </Query>
);
