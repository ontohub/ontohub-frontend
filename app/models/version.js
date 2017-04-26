import DS from 'ember-data';

export default DS.Model.extend({
  commit: DS.attr('string'),
  commitsSinceTag: DS.attr('number'),
  full: DS.attr('string'),
  tag: DS.attr('string')
});
