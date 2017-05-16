import Ember from 'ember'
import ENV from '../config/environment'

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  session: Ember.inject.service(),
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
    return this.get('ajax').post(`${ENV.host}/users/sign_in`, {
      data: { user: { name: username, password: password } }
    })
  }
})
