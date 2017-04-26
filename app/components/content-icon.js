import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['icon'],
  attributeBindings: ['src'],
  src: Ember.computed('iconImage', function() {
    return `/assets/${this.get('iconImage')}-icon.svg`;
  })
});
