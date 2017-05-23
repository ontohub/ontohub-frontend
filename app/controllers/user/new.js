import Ember from 'ember'
import config from  '../../config/environment'

export default Ember.Controller.extend({
  loadPlugin: function() {
    if (this.get('withCaptcha')) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        Ember.$.getScript('https://www.google.com/recaptcha/api.js')
      })
    }
  }.on('init'),
  siteKey: config.recaptcha_site_key,
  application: Ember.inject.controller(),
  withCaptcha: Ember.computed('config.recaptcha_disable', () =>
    !(config.recaptcha_disable || Ember.testing)
  ),

  submitNewUser(token) {
    let user = this.get('model')
    user.set('captcha', token)
    user.validate().then(({ validations }) => {
      if (validations.get('isValid')) {
        user.save().then((user) => {
          // sign in the user
          this.get('application').
            send('signin', user.get('id'), user.get('password'), (promise) => {
              // open the user's profile page
              promise.then(() => {
                this.send('transitionToUserProfile', user.get('id'))
              })
            })
        }).catch(() => {
          if (this.get('withCaptcha')) {
            /* eslint-disable no-undef */
            // This variable is defined as soon as `loadPlugin` has a value
            // (which is as soon as the page has loaded).
            grecaptcha.reset()
            /* eslint-enable no-undef */
          } else {
            this.set('showCaptchaErrorMessage', true)
          }
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
      if (this.get('withCaptcha')) {
        /* eslint-disable no-undef */
        // This variable is defined as soon as `loadPlugin` has a value
        // (which is as soon as the page has loaded).
        grecaptcha.execute()
        /* eslint-enable no-undef */
      } else {
        this.set('model.captcha', false)
        this.submitNewUser(null)
      }
    }
  }
})
