import _ from "lodash";
import gql from "graphql-tag";

export const userValidations = client => ({
  username: [
    ({ username = "" }) =>
      username.length >= 3 || "must be at least 3 characters long",
    ({ username = "" }) =>
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(username) ||
      "must consist of a-z, 0-9, - and not start/end with a dash",
    ({ username = "" }) =>
      client
        .query({
          query: gql`
            query GetOrgUnit($id: ID!) {
              organizationalUnit(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: username
          }
        })
        .then(
          resp => !resp.data.organizationalUnit || "is already taken",
          () => "could not be checked for availability"
        )
  ],
  email: [({ email = "" }) => /^[^@]+@[^@]+$/.test(email) || "is invalid"],
  password: [
    ({ password = "" }) =>
      password.length >= 10 || "must be at least 10 characters long"
  ],
  passwordConfirm: [
    ({ password = "", passwordConfirm = "" }) =>
      password === passwordConfirm || "must match the password"
  ]
});

const convertToIntermediate = (obj, fieldName) => {
  let fieldNames = Array.isArray(fieldName) ? fieldName : [fieldName];
  let fields = obj;
  if (fieldNames[0]) {
    fields = _.reduce(
      fieldNames,
      (acc, val) => ({ ...acc, [val]: fields[val] }),
      {}
    );
  }
  return _.reduce(
    fields,
    (acc, val, key) => [...acc, key, val.length, ...val],
    []
  );
};

const intermediateMap = (list, data) =>
  _.map(list, f => (_.isFunction(f) ? f(data) : f));

const toErrorMessage = name => str => `${_.upperFirst(name)} ${str}`;

const convertFromIntermediate = list => {
  let idx = 0,
    acc = {};
  while (idx < list.length) {
    let values = _.chain(list)
      .drop(idx + 2)
      .take(list[idx + 1])
      .filter(v => v !== true)
      .map(toErrorMessage(list[idx]))
      .value();
    acc[list[idx]] = values.length > 0 ? values : null;
    idx = idx + 2 + list[idx + 1];
  }
  return acc;
};

export const validate = (validations, data, fieldName = null) =>
  Promise.all(
    intermediateMap(convertToIntermediate(validations, fieldName), data)
  ).then(convertFromIntermediate);

export default validate;
