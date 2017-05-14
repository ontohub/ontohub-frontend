import Ember from 'ember'
import ENV from '../config/environment'

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  tokenData: Ember.computed('session.data.authenticated', function() {
    let authenticator = Ember.getOwner(this).lookup('authenticator:jwt'),
        session = this.get('session.data.authenticated.data.attributes'),
        tokenData = {}

    /*
     * We can't test the sessions directly because of problems with the mirage
     * AJAX handler
     */
    /* istanbul ignore else */
    if(session && Object.keys(session).length > 0) {
      tokenData = authenticator.getTokenData(session.token)
    }

    return tokenData
  }),
  authenticatedUser: Ember.computed('tokenData', function() {
    return this.get('store').find('user', this.get('tokenData.user_id'))
  }),
  validatePassword(username, password) {
    const promise = Ember.$.ajax({
      data: { user: { name: username, password: password } },
      method: 'POST',
      url: `${ENV.host}/users/sign_in`
    })
    return promise
  }
})
