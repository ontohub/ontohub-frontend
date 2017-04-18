import Ember from 'ember';
import DS from 'ember-data';

import schema from 'ontohub-frontend/schemas/models/repository_model';
import { JsonSchemaModel } from 'ember-json-schema';

const schemaModel = JsonSchemaModel.generate(schema);

export default DS.Model.extend(schemaModel, {
  ownerUser: DS.belongsTo('user'),
  ownerOrganization: DS.belongsTo('organization'),
  owner: Ember.computed('ownerUser', 'ownerOrganization', {
    get() {
      return (this.get('ownerUser') || this.get('ownerOrganization'));
    },
    set(key, value) {
      if(value.constructor.modelName === 'user') {
        this.set('ownerUser', value);
        console.log("ownerUser was set.");
      } else if(value.constructor.modelName === 'organization') {
        this.set('ownerOrganization', value);
        console.log("ownerOrganization was set.");
      }

      console.log("owner was set to ", value);
      console.log(this);
      return value;
    }
  }),
  repoId: Ember.computed('id', function() {
    let f = this.get('id').split('/');
    return f[1];
  }),
});
