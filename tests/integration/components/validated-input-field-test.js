import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import _ from 'lodash'

describe('Integration | Component | validated input field', () => {
  setupComponentTest('validated-input-field', {
    integration: true
  })

  beforeEach(function() {
    this.set('attribute', 'name')
    this.set('model', {
      validations: {
        attrs: {
          name: {
            message: null,
            isInvalid: false
          }
        }
      }
    })
    this.set('placeholder', 'my placeholder')
    this.set('type', 'text')
    this.set('value', 'my value')
    this.set('errorMessage', 'this field is invalid')
  })

  it('renders', function() {
    this.render(hbs`{{validated-input-field
      model=model
      attribute=attribute
      value=value
      type=type
      placeholder=placeholder}}`)
    expect(this.$('input')).to.have.length(1)
  })

  _.map(['placeholder', 'type'], (attr) => {
    it(`${attr} is delegated to the input field`, function() {
      this.render(hbs`{{validated-input-field
        model=model
        attribute=attribute
        value=value
        type=type
        placeholder=placeholder}}`)
      expect(this.$('input').attr(attr)).to.eq(this.get(attr))
    })
  })

  describe('autofocus', () => {
    it('turned on is delegated to the input field', function() {
      this.render(hbs`{{validated-input-field
        model=model
        attribute=attribute
        value=value
        type=type
        placeholder=placeholder
        autofocus=true}}`)
      expect(this.$('input').attr('autofocus')).to.eq('autofocus')
    })

    it('turned off is delegated to the input field', function() {
      this.render(hbs`{{validated-input-field
        model=model
        attribute=attribute
        value=value
        type=type
        placeholder=placeholder
        autofocus=false}}`)
      expect(this.$('input').attr('autofocus')).not.to.exist
    })
  })

  it('value is delegated to the input field', function() {
    this.render(hbs`{{validated-input-field
      model=model
      attribute=attribute
      value=value
      type=type
      placeholder=placeholder}}`)
    expect(this.$('input').val()).to.eq(this.get('value'))
  })

  it('shows no error', function() {
    this.render(hbs`{{validated-input-field
      model=model
      attribute=attribute
      value=value
      type=type
      placeholder=placeholder}}`)
    expect(this.$('.form-error')).to.have.length(0)
  })

  describe('invalid value', () => {
    beforeEach(function() {
      this.set(`model.validations.attrs.${this.get('attribute')}.message`,
        this.get('errorMessage'))
      this.set(`model.validations.attrs.${this.get('attribute')}.isInvalid`,
        true)
    })

    describe('without showErrorOnKeyUp', () => {
      beforeEach(function() {
        this.render(hbs`{{validated-input-field
          model=model
          attribute=attribute
          value=value
          type=type
          placeholder=placeholder}}`)
        this.$('input').focus()
        this.$('input').change()
      })

      it('does not show the error while editing', function() {
        expect(this.$('.form-error')).to.have.length(0)
      })

      it('shows the error message after focusOut', function() {
        this.$('input').blur()
        expect(this.$('.form-error')).to.have.length(1)
      })

      it('shows the correct error message', function() {
        this.$('input').blur()
        expect(this.$('.form-error').text().trim()).
          to.eq(this.get('errorMessage'))
      })
    })

    describe('with showErrorOnKeyUp', () => {
      beforeEach(function() {
        this.render(hbs`{{validated-input-field
          model=model
          attribute=attribute
          value=value
          type=type
          placeholder=placeholder
          showErrorOnKeyUp=true}}`)
        this.$('input').focus()
        this.$('input').change()
        this.$('input').trigger('keyup')
      })

      it('shows the error message', function() {
        expect(this.$('.form-error')).to.have.length(1)
      })

      it('shows the correct error message', function() {
        expect(this.$('.form-error').text().trim()).
          to.eq(this.get('errorMessage'))
      })
    })
  })
})
