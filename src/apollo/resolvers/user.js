import { Api } from '../api'
import client from '../client'
import { getUserQuery } from '../queries'
import { extractUserIdFromToken, toJSON, normalize } from '../../helpers'

export const resolveCurrentUser = () => {
  let token = global.localStorage.getItem('auth-token')
  if (!token) {
    return null
  }
  let userId = extractUserIdFromToken(token)
  return client
    .query({ query: getUserQuery, variables: { id: userId } })
    .then((j) => j.data.user)
}

export const resolveUser = (root, { id }) => {
  let userId = id
  if (!userId) {
    userId = root.userId
  }
  return Api.get(`/users/${userId}`).then(toJSON).then(normalize)
}
