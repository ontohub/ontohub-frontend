import stampit from "stampit";
import faker from "faker";
import { OrganizationalUnit } from "./organizational-unit";

export const Organization = stampit(OrganizationalUnit, {
  props: {
    description: ""
  },
  init({
    id,
    displayName = faker.company.companyName(),
    description = faker.company.catchPhrase()
  }) {
    this.id = id || faker.internet.userName(companyName);
    this.displayName = displayName;
    this.description = description;
  }
});
