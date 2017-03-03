import Jwt from 'ember-simple-auth-token/authenticators/jwt';

export default Jwt.extend({
  getAuthenticateData(credentials) {
    const authentication = {
      user: {
        [this.passwordField]: credentials.password,
        [this.identificationField]: credentials.identification
      }
    };

    return authentication;
  }
});
