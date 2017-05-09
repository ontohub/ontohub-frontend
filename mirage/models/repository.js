import { Model, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  ownerOrganization: belongsTo('organization'),
  ownerUser: belongsTo('user')
})
