import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('organizationalUnit', params.organizational_unit_id);
  }
});
