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

export { signIn, signOut };
