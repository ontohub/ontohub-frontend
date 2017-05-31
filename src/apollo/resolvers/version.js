import { Api } from '../api'
import { normalize, toJSON } from '../../helpers'

export const resolveBackendVersion = () =>
  Api.get('/version').then(toJSON).then(normalize)
