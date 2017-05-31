import { Api } from '../api'
import { extractUserIdFromToken, toJSON, normalize } from '../../helpers'

export const resolveCurrentUser = () => {
  let token = localStorage.getItem('auth-token')
  if (!token) {
    return null
  }
  let userId = extractUserIdFromToken(token)
  return resolveUser(null, { id: userId })
}

export const resolveUser = (root, { id }) => {
  let userId = id
  if(!userId) {
    userId = root.userId
  }
  return Api.get(`/users/${userId}`).then(toJSON).then(normalize)
}
