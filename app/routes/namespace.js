import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('namespace', params.namespace_id);
  },
  renderTemplate() {
    this.render();
    this.render('namespace/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
