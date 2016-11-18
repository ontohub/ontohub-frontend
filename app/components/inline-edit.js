import Ember from 'ember';

export default Ember.Component.extend({
  localClassNames: 'inline-edit',
  actions: {
    enterEditing() {
      this.set('isEditing', true);
      Ember.run.scheduleOnce('afterRender', this, function() {
        $(`#${this.elementId} .input-group-field`).focus();
      });
    },
    exitEditing() {
      this.set('isEditing', false);
      this.sendAction('action', this.get('model'));
    },
    cancelEditing(currentValue) {
      this.set('isEditing', false);
      this.get('model').rollbackAttributes();
      return false;
    }
  }
});
