import { OrganizationSettings } from "..";

describe("OrganizationSettings", () => {
  set("component", () => (
    <Router initialEntries={[path]}>
      <OrganizationSettings data={data} match={match} me={me} />
    </Router>
  ));

  set("renderedComponent", () => render(component));

  set("match", () => ({ url: `/${data.id}` }));
  set("me", () => Factories.User());
  set("data", () => ({
    ...Factories.Organization({
      id: "seed-user-organization",
      displayName: "Seed User Organization",
      description: "Contains all seed users"
    }),
    memberships: [
      {
        member: Factories.User({ id: "ada", displayName: "Ada Lovelace" }),
        role: "admin"
      }
    ],
    permissions: { role: "admin" }
  }));

  describe("Index path", () => {
    set("path", () => `/${data.id}`);
    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("Profile settings path", () => {
    set("path", () => `/${data.id}/profile`);
    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("Membership settings path", () => {
    set("path", () => `/${data.id}/members`);
    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
