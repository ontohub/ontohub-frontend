import Ember from 'ember';
import { server } from 'ember-cli-mirage';

export default function destroyApp(application) {
  Ember.run(application, 'destroy');
  server.shutdown();
}
