import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user', {})
  },
  renderTemplate() {
    this.render()
    this.render('user/new-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  },
  actions: {
    // This removes the sign-up page from the browser history
    transitionToUserProfile(user) {
      this.replaceWith('organizationalUnit.show', user)
    }
  }
})
