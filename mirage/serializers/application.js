import { JSONAPISerializer } from 'ember-cli-mirage';
const underscore = Ember.String.underscore;

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});
