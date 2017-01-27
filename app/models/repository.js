import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.belongsTo('organizationalUnit'),
  description: DS.attr('string'),
  publicAccess: DS.attr('boolean'),
  contentType: DS.attr('string'),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),
});
