import Jwt from 'ember-simple-auth-token/authenticators/jwt'

export default Jwt.extend({
  getAuthenticateData: /* istanbul ignore next */
  // This is not testable, see `services/authenticated-user.js`
  function(credentials) {
    const authentication = {
      user: {
        [this.passwordField]: credentials.password,
        [this.identificationField]: credentials.identification
      }
    }

    return authentication
  }
})
