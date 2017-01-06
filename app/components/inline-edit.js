import Ember from 'ember';

export default Ember.Component.extend({
  localClassNames: 'inline-edit',
  actions: {
    enterEditing() {
      this.set('isEditing', true);
      Ember.run.scheduleOnce('afterRender', this, function() {
        // eslint-disable-next-line no-undef
        $(`#${this.elementId} .input-group-field`).focus();
      });
    },
    exitEditing() {
      this.set('isEditing', false);
      this.sendAction('action', this.get('model'));
    },
    cancelEditing() {
      this.set('isEditing', false);
      this.get('model').rollbackAttributes();
      return false;
    }
  }
});
