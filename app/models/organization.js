import DS from 'ember-data';
import OrganizationalUnitModel from './organizational-unit';

export default OrganizationalUnitModel.extend({
  name: DS.attr('string'),
  repositories: DS.hasMany('repository')
});
