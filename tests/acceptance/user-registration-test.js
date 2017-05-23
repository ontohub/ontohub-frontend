import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'ontohub-frontend/tests/helpers/start-app'
import destroyApp from 'ontohub-frontend/tests/helpers/destroy-app'

describe('Acceptance | user registration', () => {
  let application

  beforeEach(() => {
    application = startApp()
  })

  afterEach(() => {
    destroyApp(application)
  })

  it('can visit /users/sign-up', () => {
    visit('/users/sign-up')
    return andThen(() => expect(currentURL()).to.equal('/users/sign-up'))
  })

  it('displays the form', () => {
    visit('/users/sign-up')
    return andThen(() => {
      let form = find('#user-new')
      expect(form).to.be.ok
    })
  })

  it('focuses the name field', () => {
    visit('/users/sign-up')
    return andThen(() => {
      let element = find('#user-new-name input')
      expect(element).to.be.ok
    })
  })
})
