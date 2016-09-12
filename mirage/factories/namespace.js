import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.lorem.words(); },
  slug() { return faker.lorem.word(); },
  id() { return this.slug; }
});
