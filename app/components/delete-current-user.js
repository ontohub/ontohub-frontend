import Ember from 'ember'

export default Ember.Component.extend({
  authenticatedUser: Ember.inject.service(),
  deleteUserName: '',
  deleteUserPassword: '',
  areCredentialsValid: false,
  deletionFormIsFilledIn: Ember.computed('deleteUserName', 'deleteUserPassword',
    function() {
      const filledIn = !!this.get('deleteUserName') &&
        !!this.get('deleteUserPassword')
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
      validatePassword(this.get('user.name'), this.get('deleteUserPassword'))
    promise.then((_data, _textStatus, jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    }, (jqXHR) => {
      this.set('areCredentialsValid', jqXHR.status == 201)
    })
  },
  deletionFormIsInvalid: Ember.computed('deleteUserName', 'deleteUserPassword',
    'areCredentialsValid', function() {
      return !(this.get('deletionFormIsFilledIn') &&
        this.get('deleteUserName') === this.get('user.name') &&
        this.get('areCredentialsValid'))
    }),

  actions: {
    deleteMyProfile() {
      this.get('user').destroyRecord()
      this.get('session').invalidate()
      this.transitionToRoute('index')
    }
  }
})
