import { Api } from '../api'
import {
  normalize,
  toJSON,
  extractUserIdFromToken
} from '../../helpers'

const saveToken = (json) => {
  localStorage.setItem('auth-token', json.token)
  return json
}

export const resolveSignIn = (root, { username, password }) =>
  Api.post('/users/sign_in', {
    user: {
      name: username,
      password
    }
  })
    .then(toJSON)
    .then(normalize)
    .then((json) => ({ ...json, userId: extractUserIdFromToken(json.token) }))
    .then(saveToken)
