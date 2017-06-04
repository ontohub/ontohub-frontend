// @flow

import _ from 'lodash'

const parseAttributes = (attributes: { [string]: any }): { [string]: any } =>
  _.mapKeys(attributes, _.rearg(_.camelCase, [1, 0]))

const parseRelationships = (relationships: {
  [string]: any
}): { [string]: any } => {
  let mappedKeys = _.mapKeys(
    relationships,
    (val, key) => `_${_.camelCase(key)}`
  )
  let mappedValues = _.mapValues(mappedKeys, (val) => {
    let data = _.get(val, 'data')
    if (Array.isArray(data)) {
      return _.map(data, (d) => d.id)
    } else {
      return _.get(data, 'id')
    }
  })
  return mappedValues
}

export const normalize = (json: {
  data?: {
    attributes: { [string]: any },
    relationships: any
  }
}) => {
  let attributes = {},
      relationships = {},
      keys: [string] = _.chain(json)
      .keys()
      .intersection(['errors', 'data'])
      .value()

  if (_.size(keys) !== 1) {
    let error = {
      status: '500',
      title: 'Invalid JSON API document'
    }
    throw JSON.stringify(error)
  }

  if (json.errors) {
    throw JSON.stringify(_.get(json, 'errors'))
  }

  /* istanbul ignore else */
  if (_.has(json, 'data')) {
    let data = _.get(json, 'data'), id = _.get(data, 'id')

    if (_.has(data, 'attributes')) {
      attributes = parseAttributes(_.get(data, 'attributes'))
    }
    if (_.has(data, 'relationships')) {
      relationships = parseRelationships(_.get(data, 'relationships'))
    }

    return { id, ...attributes, ...relationships }
  }
}
export const inspect = (data: any) => {
  // eslint-disable-next-line no-console
  console.log(data)
  return data
}

export const toJSON = (response: Response) => response.json()

export const extractUserIdFromToken = (token: string): ?string => {
  try {
    return JSON.parse(atob(token.split('.')[1])).user_id
  } catch (e) {
    return null
  }
}
