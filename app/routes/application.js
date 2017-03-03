import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render();
    this.render('search/bar', {
      into: 'application',
      outlet: 'search-bar'
    })
  },
  actions: {
    sessionChanged() {
      this.store.unloadAll();
      this.refresh();
    }
  }
});
