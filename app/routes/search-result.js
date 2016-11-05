import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      results: 2,
      repositories: this.get('store').query('search-result', { q: '' }),
      users: []
    });
  },
  renderTemplate() {
    this.render();
    this.render('search-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
