import Ember from 'ember';
import config from  '../../config/environment';

export default Ember.Controller.extend({
  loadPlugin: function() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      Ember.$.getScript('https://www.google.com/recaptcha/api.js')
    })
  }.on('init'),
  siteKey: config.recaptcha_site_key,
  application: Ember.inject.controller(),

  submitNewUser(token) {
    let user = this.get('model')
    user.set('captcha', token)
    user.validate().then(({ validations }) => {
      if (validations.get('isValid')) {
        user.save().then((user) => {
          // sign in the user
          this.get('application').
            send('signin', user.get('id'), user.get('password'), () => {
              // open the user's profile page
              this.transitionToRoute('organizationalUnit.show', user)
            })
        }).catch(() => {
          /* eslint-disable no-undef */
          // This variable is defined as soon as `loadPlugin` has a value
          // (which is as soon as the page has loaded).
          grecaptcha.reset()
          /* eslint-enable no-undef */
        })
      }
      return false
    })
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
      // This variable is defined as soon as `loadPlugin` has a value
      // (which is as soon as the page has loaded).
      grecaptcha.execute()
      /* eslint-enable no-undef */
    }
  }
})
