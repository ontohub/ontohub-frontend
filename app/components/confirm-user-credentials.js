import Ember from 'ember'

export default Ember.Component.extend({
  authenticatedUser: Ember.inject.service(),

  enteredName: '',
  enteredPassword: '',
  areCredentialsValid: false,

  formIsFilledIn: Ember.computed('enteredName', 'enteredPassword', function() {
    const filledIn = !!this.get('enteredName') &&
      !!this.get('enteredPassword')
    if (filledIn) {
      this.validateCredentialsDebounced()
    }
    return filledIn
  }),

  dataIsInvalid: Ember.computed('enteredName', 'enteredPassword',
    'areCredentialsValid', function() {
      const isPreconditionMet =
        this.get('precondition')(this.get('enteredName'),
                                 this.get('enteredPassword'))
      return !(this.get('formIsFilledIn') && isPreconditionMet &&
        this.get('areCredentialsValid'))
    }),

  validateCredentialsDebounced() {
    this.set('areCredentialsValid', false)
    Ember.run.debounce(this, this.validateCredentials, 500)
  },

  validateCredentials() {
    let promise = this.get('authenticatedUser').
      validatePassword(this.get('enteredName'), this.get('enteredPassword'))
    promise.then((_data, _textStatus, jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    }, (jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    })
  },

  actions: {
    confirm() {
      this.get('onConfirm')()
    }
  }
})
