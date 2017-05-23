import Ember from 'ember'

// This component represents an input field with validation.
//
// Implementation details:
// The most business logic is there to add a class 'is-valid-input' to the
// input field if the value is valid and 'is-invalid-input' if it is invalid.
// If an asynchronous call is made to check for validity, we cannot compute
// the validity just in a single component, but the view gets updated properly.
// To update the 'isInvalid' property at the right time, we trigger
// 'updateErrorClass' whenever the view is updated (the message is displayed).
// This invokes a recomputation of 'isInvalid' and thus the class can be set.
export default Ember.Component.extend({
  // input tag attributes
  autofocus: false,
  placeholder: null,
  value: null,
  type: 'text',

  // component attriibutes
  model: null,
  attribute: null,
  showErrorOnKeyUp: false,
  dependOn: null,

  // validation state
  isInvalid: Ember.computed('errorClassUpdater',
    'value', 'dependOn', function() {
      return this.
        get(`model.validations.attrs.${this.get('attribute')}.isInvalid`)
    }),

  errorClassLabel: Ember.computed('errorClass', function() {
    if (this.get('errorClass')) {
      return `${this.get('errorClass')}-label`
    } else {
      return null
    }
  }),

  errorClassInput: Ember.computed('errorClass', function() {
    if (this.get('errorClass')) {
      return `${this.get('errorClass')}-input`
    } else {
      return null
    }
  }),

  // private attributes
  showErrorMessage: false,
  showErrorClass: false,
  showSuccessClass: false,
  errorClassUpdater: false, // Just a dummy property to toggle the update
  updateErrorClass: Ember.computed(function() {
    return () => { this.toggleProperty('errorClassUpdater') }
  }),
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
  },
  errorClass: Ember.computed('errorClassUpdater',
    'value', 'dependOn', function() {
      if (this.get('showErrorClass') && this.get('isInvalid')) {
        return 'is-invalid'
      } else if (this.get('showSuccessClass') && !this.get('isInvalid')) {
        return 'is-valid'
      } else {
        return null
      }
    }),
})
