import { Factory, faker } from 'ember-cli-mirage';
import _ from 'lodash';

import SchemaFactory from 'ember-json-schema/mirage/factory';
import schema from 'ontohub-frontend/schemas/models/repository_model';

const schemaModel = SchemaFactory.generate(schema);

export default Factory.extend(Object.assign({}, schemaModel, {
  id() {
    return `${this.ownerUserId || this.ownerOrganizationId}/${faker.helpers.slugify(_.lowerCase(this.name))}`;
  }
}));
