import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  namespace: DS.belongsTo(),
  repoSlug: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  })
});
