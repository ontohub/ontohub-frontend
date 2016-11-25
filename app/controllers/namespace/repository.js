import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveRepository(obj) {
      obj.save();
    }
  }
});
