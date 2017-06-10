import _ from 'lodash'
import { gql } from 'react-apollo'
import { Client } from '../apollo'

export const userValidations = {
  username: [
    ({ username }) =>
      username.length >= 3 || 'must be at least 3 characters long',
    ({ username }) =>
      /^[a-z0-9][a-z0-9-]*$/.test(username) ||
      'must consist of a-z, A-Z, 0-9, -',
    ({ username }) =>
      Client.query({
        query: gql`
          query FetchUser($id: ID!) {
            organizationalUnit(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: username
        }
      }).then(
        (resp) => !resp.data.organizationalUnit || 'is already taken',
        () => 'could not be checked for availability'
      )
  ],
  email: [({ email }) => /^[^@]+@[^@]+$/.test(email) || 'is invalid'],
  password: [
    ({ password }) =>
      password.length >= 10 || 'must be at least 10 characters long'
  ],
  passwordConfirm: [
    ({ password, passwordConfirm }) =>
      password === passwordConfirm || 'must match the password'
  ]
}

const convertToIntermediate = (obj) =>
  _.reduce(obj, (acc, val, key) => [...acc, key, val.length, ...val], [])

const intermediateMap = (list, data) =>
  _.map(list, (f) => (_.isFunction(f) ? f(data) : f))

const toErrorMessage = (name) => (str) => `${_.upperFirst(name)} ${str}`

const convertFromIntermediate = (list) => {
  let idx = 0,
      acc = {}
  while (idx < list.length) {
    let values = _.chain(list)
      .drop(idx + 2)
      .take(list[idx + 1])
      .filter((v) => v !== true)
      .map(toErrorMessage(list[idx]))
      .value()
    if (values.length > 0) {
      acc[list[idx]] = values
    }
    idx = idx + 2 + list[idx + 1]
  }
  return acc
}

export const validate = (validations, data) => Promise.all(
    intermediateMap(convertToIntermediate(validations), data)
  ).then(convertFromIntermediate)

export default validate
