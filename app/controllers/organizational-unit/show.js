import Ember from 'ember'

export default Ember.Controller.extend({
  authenticatedUser: Ember.inject.service(),
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
  })
})
