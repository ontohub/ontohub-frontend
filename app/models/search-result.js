import DS from 'ember-data'

export default DS.Model.extend({
  repositories: DS.hasMany('repository'),
  repositoriesCount: DS.attr('number'),
  organizationalUnits: DS.hasMany('organizationalUnit'),
  organizationalUnitsCount: DS.attr('number')
})
