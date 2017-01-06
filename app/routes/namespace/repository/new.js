import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      namespace: this.store.findRecord('namespace', 'ada'),
      repository: this.store.createRecord('repository', {})
    })
  },
  renderTemplate() {
    this.render();
    this.render('namespace/repository/new-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
