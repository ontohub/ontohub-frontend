import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'
import wait from 'ember-test-helpers/wait'

describe('Integration | Component | confirm user credentials', () => {
  setupComponentTest('confirm-user-credentials', {
    integration: true
  })

  let authenticatedUserStub, confirmationCounter, expectedCredentials,
      preconditionCounter
  expectedCredentials = {
    name: 'my-name',
    password: 'my-password'
  }

  authenticatedUserStub = Ember.Service.extend({
    validatePassword(username, password) {
      let valid = username === expectedCredentials.name &&
        password === expectedCredentials.password
      return new Ember.RSVP.Promise(function(resolve, reject) {
        if(valid) {
          resolve()
        } else {
          reject()
        }
      })
    }
  })

  beforeEach(function() {
    preconditionCounter = 0
    confirmationCounter = 0
    this.register('service:authenticated-user', authenticatedUserStub)
    this.set('buttonText', 'Confirm')
    this.set('buttonClass', 'secondary')
    this.set('enteredUsername', '')
    this.set('enteredPassword', '')
    this.set('precondition', function(username) {
      preconditionCounter = preconditionCounter + 1
      return expectedCredentials.name === username
    })
    this.set('confirm', () => {
      confirmationCounter = confirmationCounter + 1
    })
    this.render(hbs`{{confirm-user-credentials
      buttonText=buttonText
      buttonClass=buttonClass
      username=enteredUsername
      password=enteredPassword
      precondition=(action precondition)
      onConfirm=(action confirm)}}`)
  })

  it('renders', function() {
    expect(this.$('form.confirm-user-credentials')).to.have.length(1)
  })

  it('renders the correct button text', function() {
    expect(this.$('button.confirm-user-credentials-submit').text().trim()).
      to.eq(this.get('buttonText'))
  })

  it('renders the correct button class', function() {
    expect(this.$('button.confirm-user-credentials-submit').
      hasClass(this.get('buttonClass'))).to.be.true
  })

  it('calls the precondition', () => {
    expect(preconditionCounter).to.eq(1)
  })

  it('disables the button on wrong username and password', function() {
    expect(this.$('button.confirm-user-credentials-submit').attr('disabled')).
      to.eq('disabled')
  })

  it('disables the button on wrong username', function() {
    this.set('enteredPassword', expectedCredentials.password)
    expect(this.$('button.confirm-user-credentials-submit').attr('disabled')).
      to.eq('disabled')
  })

  it('disables the button on wrong password', function() {
    this.set('enteredUsername', expectedCredentials.name)
    expect(this.$('button.confirm-user-credentials-submit').attr('disabled')).
      to.eq('disabled')
  })

  describe('using the correct credentials', () => {
    beforeEach(function() {
      this.set('enteredUsername', expectedCredentials.name)
      this.set('enteredPassword', expectedCredentials.password)
    })

    it('enables the button on correct credentials', function(done) {
      wait().then(() => {
        expect(this.$('button.confirm-user-credentials-submit').
          attr('disabled')).not.to.exist
        done()
      })
    })

    it('clicking the button sends the confirm action', function(done) {
      wait().then(() => {
        this.$('button.confirm-user-credentials-submit').click()
        expect(confirmationCounter).to.eq(1)
        done()
      })
    })

    it('submitting the form sends the confirm action', function(done) {
      wait().then(() => {
        this.$('form.confirm-user-credentials').submit()
        expect(confirmationCounter).to.eq(1)
        done()
      })
    })
  })
})
