import Ember from 'ember'

export default Ember.Controller.extend({
  authenticatedUser: Ember.inject.service(),
  session: Ember.inject.service(),
  queryParams: ['tab', 'settingsMenu'],
  tab: 'repositories',
  settingsMenu: 'profile',

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

  settingsMenuProfile: Ember.computed('settingsMenu', function() {
    let settingsMenu = this.get('settingsMenu')
    return (settingsMenu == 'profile') || (settingsMenu == null)
  }),
  settingsMenuDeleteProfile: Ember.computed('settingsMenu', function() {
    return this.get('settingsMenu') == 'deleteProfile'
  }),
  settingsMenuDummy1: Ember.computed('settingsMenu', function() {
    return this.get('settingsMenu') == 'dummy1'
  }),
  settingsMenuDummy2: Ember.computed('settingsMenu', function() {
    return this.get('settingsMenu') == 'dummy2'
  }),
  settingsMenuDummy3: Ember.computed('settingsMenu', function() {
    return this.get('settingsMenu') == 'dummy3'
  }),
  actions: {
    setSettingsMenu(targetMenu) {
      this.set('settingsMenu', targetMenu)
    },
    deleteUser() {
      this.get('model').destroyRecord()
      this.get('session').invalidate()
      this.transitionToRoute('index')
    }
  }
})
