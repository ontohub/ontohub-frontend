import { Factory } from 'ember-cli-mirage';

import SchemaFactory from 'ember-json-schema/mirage/factory';
import schema from 'ontohub-frontend/schemas/models/user_model';

const schemaModel = SchemaFactory.generate(schema);

export default Factory.extend(schemaModel);
