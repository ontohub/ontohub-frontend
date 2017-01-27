import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  namespace: DS.belongsTo(),
  public_access: DS.attr('boolean'),
  content_type: DS.attr('string'),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),

  splitSlug: function() {
    return this.get('id').split('/');
  }
});
