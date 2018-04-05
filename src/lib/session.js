import { ApolloConsumer } from "react-apollo";

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

const SignIn = ({ token }) => (
  <ApolloConsumer>
    {client => {
      signIn(client, token);
      return null;
    }}
  </ApolloConsumer>
);

const SignOut = () => (
  <ApolloConsumer>
    {client => {
      signOut(client);
      return null;
    }}
  </ApolloConsumer>
);

export { SignIn, SignOut, signIn, signOut };
