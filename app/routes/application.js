import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render();
    this.render('search/bar', {
      into: 'application',
      outlet: 'search-bar'
    })
  },
  model() {
    return this.get('store').find('version', 'version');
  },
  actions: {
    sessionChanged: /* istanbul ignore next */
    // This is not testable, see `services/authenticated-user.js`
    function() {
      this.store.unloadAll();
      this.refresh();
    }
  }
});
