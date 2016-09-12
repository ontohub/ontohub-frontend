import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.internet.userName(); },
  slug() { return faker.helpers.slugify(this.name); },
  id() { return this.slug; }
});
