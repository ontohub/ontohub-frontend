import stampit from "stampit";
import faker from "faker";
import { OrganizationalUnit } from "./organizational-unit";

export const User = stampit(OrganizationalUnit, {
  props: {
    emailHash: "3e3417d7ef77d5932a6734b916515ed5"
  },
  init({ id, displayName, email }) {
    const firstName = faker.name.firstName(),
      lastName = faker.name.lastName();

    this.id = id || faker.internet.userName(firstName, lastName);
    this.displayName = displayName || `${firstName} ${lastName}`;
    this.email = email || faker.internet.exampleEmail();
  }
});
