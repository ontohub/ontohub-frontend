import _ from 'lodash'

const validateOne = ({ validate, field, text }, data) =>
  Promise.resolve(validate(data)).then((result) => {
    if (result) {
      return null
    } else {
      return {
        field,
        text
      }
    }
  })

export const validate = (validations, data) =>
  Promise.all(
    _.map(validations, (validation) => validateOne(validation, data))
  ).then((validations) =>
    _.chain(validations)
      .reduce((acc, validation) => {
        if (validation) {
          return {
            ...acc,
            [validation.field]: [
              ...(acc[validation.field] || []),
              validation.text
            ]
          }
        } else {
          return acc
        }
      }, {})
      .value()
  )

export default validate
