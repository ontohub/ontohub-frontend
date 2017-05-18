/* jshint expr:true */
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'
import { startMirage } from 'ontohub-frontend/initializers/ember-cli-mirage'

let model, validator, server

describe('Unit | Validator | UsernameAvailableValidator', () => {
  setupTest('validator:username-available', {
    // Specify the other units that are required for this test.
    integration: true,
    setup() {
      validator = this.subject()
    }
  })

  beforeEach(() => {
    server = startMirage()
    model = server.create('user')
  })

  afterEach(() => {
    server.shutdown()
  })

  // it('does not exist', (done) => {
  //   validator.validate(`different-${model.name}`).then((message) => {
  //     expect(message).to.be.true
  //     done()
  //   }).catch((error) => {
  //     done(error)
  //   })
  // })

  // it('exists', (done) => {
  //   validator.validate(model.name).then((message) => {
  //     expect(message).to.eq('This name is already in use')
  //     done()
  //   }).catch((error) => {
  //     done(error)
  //   })
  // })
})
