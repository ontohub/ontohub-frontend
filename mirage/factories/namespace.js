import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.lorem.word(); },
  slug() { return this.name; },
  id() { return this.slug; }
});
