import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.lorem.words(); },
  description() { return faker.lorem.sentence(); },
  slug() { return this.name(); }
});
