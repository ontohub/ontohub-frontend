import Ember from 'ember'

export default Ember.Component.extend({
  authenticatedUser: Ember.inject.service(),

  username: '',
  password: '',
  areCredentialsValid: false,

  formIsFilledIn: Ember.computed('username', 'password', function() {
    const filledIn = !!this.get('username') &&
      !!this.get('password')
    if (filledIn) {
      this.validateCredentialsDebounced()
    }
    return filledIn
  }),

  dataIsInvalid: Ember.computed('username', 'password', 'areCredentialsValid',
    function() {
      const isPreconditionMet =
        this.get('precondition')(this.get('username'), this.get('password'))
      return !(this.get('formIsFilledIn') && isPreconditionMet &&
        this.get('areCredentialsValid'))
    }),

  validateCredentialsDebounced() {
    this.set('areCredentialsValid', false)
    Ember.run.debounce(this, this.validateCredentials, 500)
  },

  validateCredentials() {
    this.get('authenticatedUser').
      validatePassword(this.get('username'), this.get('password')).
      then(() => { this.set('areCredentialsValid', true) }).
      catch(() => { this.set('areCredentialsValid', false) })
  },

  actions: {
    confirm() {
      this.get('onConfirm')()
    }
  }
})
