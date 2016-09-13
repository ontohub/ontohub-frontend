import { JSONAPISerializer } from 'ember-cli-mirage';
import Ember from 'ember';
const underscore = Ember.String.underscore;

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});
