import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let orgUnit = this.modelFor('organizationalUnit'),
        repo_id = [orgUnit.id, params.repository_id].join('/'),
        repo = this.store.find('repository', repo_id);
    return repo;
  },
  renderTemplate() {
    this.render();
    this.render('organizational-unit/repository/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
