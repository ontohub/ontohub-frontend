import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      results: 2,
      repositories: this.get('store').query('search-result', { q: '' }),
      users: [],
      oms: []
    });
  },
  renderTemplate() {
    this.render();
    this.render('empty', {
      into: 'application',
      outlet: 'search-bar'
    });
    this.render('search-header', {
      into: 'application',
      outlet: 'top-route-header'
    });
  },
  resetController(controller, isExiting, transition) {
    controller.set('type', null);
    controller.set('q', null);
  }
});
