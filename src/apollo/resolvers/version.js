import config from '../../config'
import { normalize } from '../../helpers'

export const resolveBackendVersion = () =>
  fetch(`${config.api.endpoint}/version`)
    .then((response) => response.json())
    .then(normalize)
