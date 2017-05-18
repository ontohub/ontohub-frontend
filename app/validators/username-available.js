import Ember from 'ember'
import BaseValidator from 'ember-cp-validations/validators/base'

export default BaseValidator.extend({
  store: Ember.inject.service(),
  validate(userId) {
    return this.get('store').findRecord('organizationalUnit', userId).
      then(() => 'This name is already registered').
      catch(() => true)
  }
})
