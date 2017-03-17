import DS from 'ember-data';
import OrganizationalUnitModel from './organizational-unit';

import schema from 'ontohub-frontend/schemas/models/organization_model';
import { JsonSchemaModel } from 'ember-json-schema';

const schemaModel = JsonSchemaModel.generate(schema);

export default OrganizationalUnitModel.extend(schemaModel, {
  members: DS.hasMany('user')
});
