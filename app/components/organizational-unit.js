import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['organizational-unit'],
  isUser: Ember.computed('orgUnit', function() {
    return this.get('orgUnit').constructor.modelName === 'user'
  })
})
