import ApplicationSerializer from './application';
import _ from 'lodash';

export default ApplicationSerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let data = payload.data,
        isArray = true;
    if(!Array.isArray(data)) {
      data = [payload.data];
      isArray = false;
    }
    data = _.map(data, (d) => {
      let owner = d.relationships.owner;

      /*
      * We can't test this with mirage, as we send `owner_user` or
      * `owner_organization` instead of `owner`
      */
      /* istanbul ignore if */
      if(owner) {
        let type = owner.data.type;

        if(type === 'users') {
          d.relationships.owner_user = owner;
        } else if(type === 'organizations') {
          d.relationships.owner_organization = owner;
        }

        delete d.relationships.owner;
      }

      return d;
    });

    if(!isArray) {
      data = data[0];
    }

    payload.data = data;

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
