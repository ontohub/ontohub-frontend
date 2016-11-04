import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render();
    this.render('namespace/repository/new-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
