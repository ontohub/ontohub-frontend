import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  namespace: DS.belongsTo(),
  "content_type": DS.attr('string'),
  "public_access": DS.attr('boolean'),

  repoSlug: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),

  splitRepoSlug: function() {
    return this.get('id').split('/');
  }
});
