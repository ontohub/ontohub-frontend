import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').queryRecord('search-result', { q: '' });
  },
  renderTemplate() {
    this.render('search/show');
    this.render('empty', {
      into: 'application',
      outlet: 'search-bar'
    });
    this.render('search/header', {
      into: 'application',
      outlet: 'top-route-header'
    });
  },
  resetController(controller) {
    controller.set('type', null);
    controller.set('q', null);
  }
});
