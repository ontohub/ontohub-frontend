import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authenticatedUser: Ember.inject.service(),

  localClassNames: 'top-bar',

  identification: "ada",
  password: "changeme",
  actions: {
    signin() {
      let credentials = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:jwt', credentials);
    },
    signout() {
      this.get('session').invalidate();
    }
  }
});
