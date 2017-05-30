import _ from 'lodash'

/**
 * @param {object} attributes - a valid JSON API attributes object
 * @return {object}
 */
const parseAttributes = (attributes) => {
  return _.mapKeys(attributes, _.rearg(_.camelCase, [1, 0]))
}

/**
 * @param {object} relationships - a valid JSON API relationships object
 * @return {object}
 */
const parseRelationships = (relationships) => {
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

/**
 * @param {object} json - A valid toplevel JSON API response
 * @return {object}
 */
export const normalize = (json) => {
  let attributes = {},
    relationships = {},
    keys = _.chain(json).keys().intersection(['errors', 'data']).value()

  if(_.size(keys) !== 1) {
    let error = {
      status: "500",
      title: "Invalid JSON API document"
    }
    throw JSON.stringify(error);
  }

  if (json.errors) {
    throw JSON.stringify(_.get(json, 'errors'))
  }

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
