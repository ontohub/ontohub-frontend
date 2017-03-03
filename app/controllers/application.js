import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  authenticatedUser: Ember.inject.service(),
  actions: {
    signin(identification, password, callback = null) {
      let credentials = { identification, password },
          promise =
            this.get('session').authenticate('authenticator:jwt', credentials);
      this.send('sessionChanged');
      callback(promise);
    },
    signout(callback = null) {
      this.get('session').invalidate();
      this.send('sessionChanged');
      callback();
    }
  }
});
