import stampit from "stampit";
import faker from "faker";

export const Repository = stampit({
  props: {
    id: null,
    name: null,
    description: ""
  },
  init({
    id,
    name = faker.company.companyName(),
    description = faker.company.catchPhrase()
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
});
