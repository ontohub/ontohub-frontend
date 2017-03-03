import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['icon'],
  attributeBindings: ['src'],
  src: Ember.computed('contentType', function() {
    return `/assets/${this.get('contentType')}-icon.svg`;
  })
});
