import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let owner = payload.data.relationships.owner;

    /*
     * We can't test this with mirage, as we send `owner_user` or
     * `owner_organization` instead of `owner`
     */
    /* istanbul ignore if */
    if(owner) {
      let type = owner.data.type;

      if(type === 'users') {
        payload.data.relationships.owner_user = owner;
      } else if(type === 'organizations') {
        payload.data.relationships.owner_organization = owner;
      }

      delete payload.data.relationships.owner;
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  serialize(snapshot, options) {
    let json = this._super(snapshot, options),
        relationships = json.data.relationships,
        owner;
    if(relationships.owner_user && relationships.owner_user.data) {
      owner = relationships.owner_user;
    } else {
      owner = relationships.owner_organization;
    }

    relationships.owner = owner;
    delete relationships.owner_user;
    delete relationships.owner_organization;
    return json;
  }
});
