import { PureProfileSettings } from "../profile-settings";

describe("PureProfileSettings", () => {
  set("component", () => (
    <Router>
      <PureProfileSettings
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        touched={touched}
        values={values}
      />
    </Router>
  ));

  set("renderedComponent", () => render(component));
  set("wrapper", () => mount(component));

  set("errors", () => ({}));
  set("handleBlur", () => jest.fn());
  set("handleChange", () => jest.fn());
  set("handleSubmit", () => jest.fn());
  set("touched", () => ({}));
  set("values", () =>
    Factories.Organization({
      id: "seed-user-organization",
      displayName: "Seed User Organization",
      description: "An organization for all seed users"
    })
  );

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it("calls the handleSubmit callback", () => {
    wrapper.find("form").simulate("submit", {});
    expect(handleSubmit.mock.calls.length).toEqual(1);
  });

  describe("Error state", () => {
    set("touched", () => ({ displayName: true, description: true }));
    set("errors", () => ({
      displayName: ["is too short"],
      description: ["must be filled"]
    }));

    it("matches snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
