import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveRepository(obj) {
      console.log("foo");
      obj.save();
      //model.set(field, value);
    }
  }
});
