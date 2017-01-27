import DS from 'ember-data';

export default DS.Model.extend({
  namespace: DS.belongsTo('namespace'),
  name: DS.attr('string')
});
