import Ember from 'ember'
import BaseValidator from 'ember-cp-validations/validators/base'

export default BaseValidator.extend({
  store: Ember.inject.service(),
  validate(value) {
    return this.get('store').
      queryRecord('user', { filter: { name: value } }).
      then(() => 'The username is already in use').
      catch(() => true) // safe to use this username
  }
})
