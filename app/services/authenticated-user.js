import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  tokenData: Ember.computed('session.data.authenticated', function() {
    let authenticator = Ember.getOwner(this).lookup('authenticator:jwt'),
        session = this.get('session.data.authenticated.data.attributes'),
        tokenData = {};

    /*
     * We can't test the sessions directly because of problems with the mirage
     * AJAX handler
     */
    /* istanbul ignore else */
    if(session && Object.keys(session).length > 0) {
      tokenData = authenticator.getTokenData(session.token);
    }

    return tokenData;
  }),
  authenticatedUser: Ember.computed('tokenData', function() {
    return this.get('store').find('user', this.get('tokenData.user_id'));
  })
});
