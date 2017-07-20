export const signOut = (client) => {
  localStorage.removeItem('auth-token')
  return client.resetStore()
}

export const signIn = (client, token) => {
  if (token) {
    localStorage.setItem('auth-token', token)
    client.resetStore()
  }
}
