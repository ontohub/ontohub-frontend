import validate from '../validations'

describe('validate', () => {
  let validations = {
    num: [({ num }) => num < 4 || 'is too big']
  }

  it('validates with errors', () =>
    validate(validations, { num: 5 }).then((errors) => {
      expect(Object.keys(errors).length).toBe(1)
    }))

  it('validates without errors', () =>
    validate(validations, { num: 2 }).then((errors) => {
      expect(Object.keys(errors).length).toBe(0)
    }))
})
