import Ember from 'ember';
import DS from 'ember-data';

import loadedSchema from 'ontohub-frontend/schema/models/repository_model';
import { JsonSchemaModel } from 'ember-json-schema';

let schema = loadedSchema;
let schemaModel = JsonSchemaModel.generate(schema);

export default DS.Model.extend(schemaModel, {
  owner: DS.belongsTo('organizationalUnit'),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),
});
