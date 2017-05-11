import Ember from 'ember'

export default Ember.Controller.extend({
  authenticatedUser: Ember.inject.service(),
  session: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'repositories',

  tabRepositories: Ember.computed('tab', function() {
    let tab = this.get('tab')
    return (tab == 'repositories') || (tab == null)
  }),

  tabMembers: Ember.computed('tab', function() {
    return (this.get('tab') == 'members')
  }),

  tabOrganizations: Ember.computed('tab', function() {
    return (this.get('tab') == 'organizations')
  }),

  tabSettings: Ember.computed('tab', function() {
    return (this.get('tab') == 'settings')
  }),

  isMyProfile: Ember.computed('authenticatedUser', 'model', function() {
    return (this.get('authenticatedUser.tokenData.user_id') ==
      this.get('model.id'))
  }),

  deleteUserName: '',
  deleteUserPassword: '',

  deletionFormIsInvalid: Ember.computed('deleteUserName', 'deleteUserPassword',
    function() {
      let valid = true,
          identification = this.get('model.id'),
          password = this.get('deleteUserPassword'),
          session = this.get('session'),
          loginPromise = null
      valid = valid && this.get('deleteUserName') === this.get('model.name')
      valid = valid && password
      if (valid) {
        loginPromise = session.
          authenticate('authenticator:jwt', { identification, password })
        return !(valid && loginPromise.then(() => valid).catch(() => false))
      } else {
        return true
      }
    }),

  actions: {
    deleteMyProfile() {
      this.get('model').destroyRecord()
      this.get('session').invalidate()
      this.transitionToRoute('index')
    }
  }
})
