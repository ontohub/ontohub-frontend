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
  }
})
