import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    enterEditing() {
      this.set('isEditing', true);
    },
    exitEditing() {
      this.set('isEditing', false);
      this.sendAction('action', this.get('obj'));
    }
  }
});
