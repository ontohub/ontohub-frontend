import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('organizationalUnit', params.organizational_unit_id);
  },
  renderTemplate() {
    this.render();
    this.render('organizational-unit/header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
