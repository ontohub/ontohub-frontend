import Ember from 'ember';
import _ from 'lodash';

const SearchResultComponent = Ember.Component.extend({
  localClassNames: 'search-result',
  icon: Ember.computed('params.[]', function() {
    return this.get('params')[0];
  }),
  title: Ember.computed('params.[]', function() {
    return this.get('params')[1];
  }),
  routeParams: Ember.computed('params.[]', function() {
    return _.drop(this.get('params'), 2);
  }),
});

SearchResultComponent.reopenClass({
  positionalParams: 'params'
});

export default SearchResultComponent;
