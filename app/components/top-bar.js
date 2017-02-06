import Ember from 'ember';

export default Ember.Component.extend({
  localClassNames: 'top-bar',
  session: Ember.inject.service(),
  actions: {
    signin: function() {
      var credentials = this.getProperties('username', 'password'),
        authenticator = 'authenticator:jwt';

      this.get('session').authenticate(authenticator, credentials);
    }
  }
});
