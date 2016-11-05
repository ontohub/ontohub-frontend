import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let ns = this.modelFor('namespace');
    return this.store.find('repository', `${ns.id}/${params.repository_id}`);
  },
  renderTemplate() {
    this.render();
    this.render('namespace/repository/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
