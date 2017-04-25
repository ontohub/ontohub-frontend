import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['icon'],
  attributeBindings: ['src'],
  src: Ember.computed('icon-image', function() {
    return `/assets/${this.get('icon-image')}-icon.svg`;
  })
});
