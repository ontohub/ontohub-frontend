import { Header } from "../Header";

describe("Header", () => {
  set("organizationalUnit", () => ({}));
  set("loading", () => false);
  set("component", () => (
    <Router>
      <Header
        data={{
          loading,
          organizationalUnit
        }}
      />
    </Router>
  ));
  set("renderedComponent", () => render(component));

  describe("Loading state", () => {
    set("loading", () => true);

    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  ["admin", "read"].map(role => {
    describe(`Finished state with role "${role}"`, () => {
      set("organizationalUnit", () => ({
        ...Factories.Organization({
          id: "seed-user-organization",
          displayName: "Seed User Organization",
          description: "An organization for all seed users"
        }),
        permissions: { role: role }
      }));

      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });
  });
});
