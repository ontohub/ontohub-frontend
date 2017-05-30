import { resolveBackendVersion } from './version'

export { resolveBackendVersion }

export default {
  Query: {
    version: resolveBackendVersion
  }
}
