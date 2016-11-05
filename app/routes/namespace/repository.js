import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('repository', params.repository_id);
  },
  renderTemplate() {
    this.render();
    this.render('namespace/repository/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
