import Ember from 'ember';
import config from  '../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  authenticatedUser: Ember.inject.service(),
  actions: {
    signin: /* istanbul ignore next */
    // This is not testable, see `services/authenticated-user.js`
    function(identification, password, callback = null) {
      let credentials = { identification, password },
          promise =
            this.get('session').authenticate('authenticator:jwt', credentials);
      this.send('sessionChanged');
      callback(promise);
    },
    signout: /* istanbul ignore next */
    // This is not testable, see `services/authenticated-user.js`
    function(callback = null) {
      this.get('session').invalidate();
      this.send('sessionChanged');
      callback();
    }
  },
  versionConfig: config.versionConfig
});
