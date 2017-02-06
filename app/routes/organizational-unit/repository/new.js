import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('repository', {});
  },
  renderTemplate() {
    this.render();
    this.render('organizational-unit/repository/new-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
