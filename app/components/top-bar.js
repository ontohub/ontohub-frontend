import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authenticatedUser: Ember.inject.service(),

  localClassNames: 'top-bar',

  isLoading: false,
  identification: "ada",
  password: "changeme",
  actions: {
    signin() {
      let credentials = this.getProperties('identification', 'password');

      let promise = this.get('session').authenticate('authenticator:jwt', credentials);
      this.send('loading', promise);
    },
    signout() {
      this.get('session').invalidate();
    },
    loading(data) {
      this.set('isLoading', true);
      data.finally(() => this.set('isLoading', false));
    }
  }
});
