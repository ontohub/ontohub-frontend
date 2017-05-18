import DS from 'ember-data'

export default DS.Model.extend({
  // The name is not part of the JSON schema, but it is needed for registration
  // and signing in.
  name: DS.attr('string'),
  repositories: DS.hasMany('repository')
})
