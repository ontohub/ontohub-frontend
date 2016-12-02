import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let namespace = this.modelFor('namespace');
    let repo_id = [namespace.id, params.repository_id].join('/');
    return this.store.find('repository', repo_id);
  },
  renderTemplate() {
    this.render();
    this.render('namespace/repository/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
