import { Factory, faker } from 'ember-cli-mirage'
import _ from 'lodash'

import SchemaFactory from 'ember-json-schema/mirage/factory'
import schema from 'ontohub-frontend/schemas/models/organization_model'

const schemaModel = SchemaFactory.generate(schema)

export default Factory.extend(Object.assign({}, schemaModel, {
  name(i) {
    return `organization-${i}`
  },
  id() {
    return faker.helpers.slugify(_.lowerCase(this.name))
  }
}))
