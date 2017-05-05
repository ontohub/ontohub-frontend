import Ember from 'ember';

// This component shall ONLY be used inside the component validated-input-field
export default Ember.Component.extend({
  didInsertElement(...args) {
    this._super(args)
    this.get('updateErrorClass')()
  }
})
