import { OrganizationalUnit } from ".";

describe("OrganizationalUnit", () => {
  set("component", () => (
    <Router initialEntries={[path]}>
      <OrganizationalUnit data={{ loading, organizationalUnit }} />
    </Router>
  ));

  set("renderedComponent", () => render(component));

  describe("User", () => {
    set("organizationalUnit", () => ({
      ...Factories.User({ id: "ada", displayName: "Ada Lovelace" }),
      repositories: [
        Factories.Repository({
          id: "ada/some-repo",
          name: "Some Repo",
          description: "This is some repo"
        }),
        Factories.Repository({
          id: "ada/another-repo",
          name: "Another Repo",
          description: "This is another repo"
        })
      ],
      organizationMemberships: [
        {
          organization: Factories.Organization({
            id: "seed-user-organization",
            displayName: "Seed User Organization",
            description: "An organization containing seed users"
          })
        }
      ]
    }));

    describe("Loading state", () => {
      set("path", () => "/ada");
      set("loading", () => true);
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Index route", () => {
      set("path", () => "/ada");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Repositories route", () => {
      set("path", () => "/ada/repositories");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Organizations route", () => {
      set("path", () => "/ada/organizations");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });
  });

  describe("Organization", () => {
    set("organizationalUnit", () => ({
      ...Factories.Organization({
        id: "seed-user-organization",
        displayName: "Seed User Organization",
        description: "An organization containing seed users"
      }),
      repositories: [
        Factories.Repository({
          id: "seed-user-organization/some-repo",
          name: "Some Repo",
          description: "This is some repo"
        }),
        Factories.Repository({
          id: "seed-user-organization/another-repo",
          name: "Another Repo",
          description: "This is another repo"
        })
      ],
      memberships: [
        {
          member: Factories.User({ id: "ada", displayName: "Ada Lovelace" })
        }
      ]
    }));

    describe("Loading state", () => {
      set("path", () => "/seed-user-organization");
      set("loading", () => true);
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Index route", () => {
      set("path", () => "/seed-user-organization");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Repositories route", () => {
      set("path", () => "/seed-user-organization/repositories");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Members route", () => {
      set("path", () => "/seed-user-organization/members");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("Settings route", () => {
      set("path", () => "/seed-user-organization/settings");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });
  });
});
