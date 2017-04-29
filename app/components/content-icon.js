import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['icon'],
  attributeBindings: ['src'],
  src: Ember.computed('iconImage', function() {
    return this.get('iconImage') ?
      `/assets/${this.get('iconImage')}-icon.svg` : ''
  }),
});
