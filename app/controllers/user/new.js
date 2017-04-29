import Ember from 'ember';
import config from  '../../config/environment';

export default Ember.Controller.extend({
  loadPlugin: function() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      Ember.$.getScript('https://www.google.com/recaptcha/api.js')
    })
  }.on('init'),
  siteKey: config.recaptcha_site_key,

  submitNewUser(token) {
    let user = this.get('model')
    user.set('name', this.get('name'))
    user.set('realName', this.get('realName'))
    user.set('email', this.get('email'))
    user.set('password', this.get('password'))
    user.set('passwordConfirmation', this.get('passwordConfirmation'))
    user.set('captcha', token)
    user.save().then((user) => {
      this.transitionToRoute('organizationalUnit.show', user)
    })
    return false;
  },

  actions: {
    initializeRecaptcha() {
      if (window.recaptchaCallback === undefined) {
        window.recaptchaCallback = (token) => {
          this.submitNewUser(token)
        }
      }
    },
    validateRecaptcha() {
      /* eslint-disable no-undef */
      // This variable is defined as soon as `loadPlugin` has a value (which is
      // as soon as the page has loaded).
      grecaptcha.execute()
      /* eslint-enable no-undef */
    }
  }
})
