import Ember from 'ember'

export default Ember.Component.extend({
  authenticatedUser: Ember.inject.service(),
  session: Ember.inject.service(),

  enteredName: '',
  enteredPassword: '',
  areCredentialsValid: false,
  deletionFormIsFilledIn: Ember.computed('enteredName', 'enteredPassword',
    function() {
      const filledIn = !!this.get('enteredName') &&
        !!this.get('enteredPassword')
      if (filledIn) {
        this.validateCredentialsDebounced()
      }
      return filledIn
    }),
  validateCredentialsDebounced() {
    Ember.run.debounce(this, this.validateCredentials, 500)
  },
  validateCredentials() {
    this.set('areCredentialsValid', false)
    let promise = this.get('authenticatedUser').
      validatePassword(this.get('user.name'), this.get('enteredPassword'))
    promise.then((_data, _textStatus, jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    }, (jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    })
  },
  deletionFormIsInvalid: Ember.computed('enteredName', 'enteredPassword',
    'areCredentialsValid', function() {
      return !(this.get('deletionFormIsFilledIn') &&
        this.get('enteredName') === this.get('user.name') &&
        this.get('areCredentialsValid'))
    }),

  actions: {
    deleteMyProfile() {
      this.get('onDelete')()
    }
  }
})
