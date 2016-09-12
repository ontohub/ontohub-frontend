import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() { return faker.commerce.productName(); },
  description() { return faker.company.catchPhrase(); },
  slug() { return faker.helpers.slugify(this.name).toLowerCase(); },
  id() { return this.slug; }
});
