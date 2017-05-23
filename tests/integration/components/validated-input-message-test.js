import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | validated input message', () => {
  setupComponentTest('validated-input-message', {
    integration: true
  })

  let timesCalled

  beforeEach(function() {
    timesCalled = 0
    this.set('attribute', 'name')
    this.set('model', {
      validations: {
        attrs: {
          name: {
            message: 'an error message'
          }
        }
      }
    })
    this.set('counter', () => {
      timesCalled = timesCalled + 1
    })
  })

  it('calls the external action', function() {
    this.render(hbs`{{validated-input-message
      model=model
      attribute=attribute
      updateErrorClass=(action counter)}}`)
    expect(timesCalled).to.eq(1)
  })

  it('renders', function() {
    this.render(hbs`{{validated-input-message
      model=model
      attribute=attribute
      updateErrorClass=(action counter)}}`)
    expect(this.$('.form-error')).to.have.length(1)
  })

  it('shows the error', function() {
    this.render(hbs`{{validated-input-message
      model=model
      attribute=attribute
      updateErrorClass=(action counter)}}`)
    expect(this.$('.form-error').text().trim()).
      to.eq(this.get('model.validations.attrs.name.message'))
  })
})
