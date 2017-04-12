import Ember from 'ember';
import DS from 'ember-data';

import schema from 'ontohub-frontend/schemas/models/repository_model';
import { JsonSchemaModel } from 'ember-json-schema';

const schemaModel = JsonSchemaModel.generate(schema);

export default DS.Model.extend(schemaModel, {
  ownerUser: DS.belongsTo('user'),
  ownerOrganization: DS.belongsTo('organization'),
  owner: Ember.computed('ownerUser', 'ownerOrganization', function() {
    return (this.get('ownerUser') || this.get('ownerOrganization'));
  }),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),
});
