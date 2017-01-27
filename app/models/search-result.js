import DS from 'ember-data';

export default DS.Model.extend({
  repositories: DS.hasMany(),
  users: DS.hasMany('namespace')
});
