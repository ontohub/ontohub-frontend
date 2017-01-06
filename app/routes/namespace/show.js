import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let ns = this.modelFor('namespace');
    let repos = ns.hasMany('repositories').load();
    return Ember.RSVP.hash({
      namespace: ns,
      repositories: repos
    });
  },
  setupController(controller, model) {
    model.namespace.hasMany('repositories').reload();
    controller.set('model', model);
  }
});
