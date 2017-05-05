import Ember from 'ember';

export default Ember.Component.extend({
  // input tag attributes
  autofocus: false,
  placeholder: null,
  value: null,
  type: 'text',

  // component attriibutes
  model: null,
  showErrorOnKeyUp: false,
  dependOn: null,

  // validation state
  isInvalid: Ember.computed('value', 'dependOn', function() {
    return this.
      get(`model.validations.attrs.${this.get('attribute')}.isInvalid`)
  }),

  errorClass: Ember.computed('value', 'dependOn', function() {
    if (this.get('showErrorClass') && this.get('isInvalid')) {
      return 'is-invalid-input'
    } else if (this.get('showSuccessClass') && !this.get('isInvalid')) {
      return 'is-valid-input'
    } else {
      return null
    }
  }),

  // private attributes
  showErrorMessage: false,
  showErrorClass: false,
  showSuccessClass: false,
  focusIn() {
    this.set('showErrorClass', true)
    this.set('showSuccessClass', true)
  },
  keyUp() {
    if (this.get('showErrorOnKeyUp')) {
      this.set('showErrorMessage', true)
    }
  },
  focusOut() {
    this.set('showErrorMessage', true)
  }
});
