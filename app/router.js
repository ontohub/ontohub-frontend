import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(() => {
  this.route('namespace.show', { path: ':namespace_id' }, function() {});
});

export default Router;
