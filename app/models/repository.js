import Ember from 'ember';
import DS from 'ember-data';

import schema from 'ontohub-frontend/schemas/models/repository_model';
import { JsonSchemaModel } from 'ember-json-schema';

const schemaModel = JsonSchemaModel.generate(schema);

export default DS.Model.extend(schemaModel, {
  owner: DS.belongsTo('organizationalUnit'),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),
});
