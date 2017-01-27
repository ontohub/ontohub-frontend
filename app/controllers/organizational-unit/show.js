import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: 'repositories',

  tabRepositories: Ember.computed('tab', function() {
    let tab = this.get('tab');
    return (tab == 'repositories') || (tab == null);
  }),

  tabMembers: Ember.computed('tab', function() {
    return (this.get('tab') == 'members');
  }),

  tabOrganizations: Ember.computed('tab', function() {
    return (this.get('tab') == 'organizations');
  })
});
