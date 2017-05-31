import { resolveBackendVersion } from './version'
import { resolveSignIn } from './session'
import { resolveCurrentUser, resolveUser } from './user'

export { resolveBackendVersion }

export default {
  Query: {
    version: resolveBackendVersion,
    currentUser: resolveCurrentUser,
    user: resolveUser
  },
  Mutation: {
    signIn: resolveSignIn
  },
  Session: {
    user: resolveUser
  }
}
