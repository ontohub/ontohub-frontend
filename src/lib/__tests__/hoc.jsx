import { HOC } from "lib/hoc";

describe("HOC", () => {
  set("component", () => (
    <HOC component="h1" hoc={hoc} className={className}>
      Hello
    </HOC>
  ));
  set("renderedComponent", () => render(component));

  describe("default HOC", () => {
    set("className", () => "once");
    set("hoc", () => undefined);

    it("applies the default HOC (identity)", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("custom HOC", () => {
    set("className", () => "twice");
    set("hoc", () => Component => props => (
      <React.Fragment>
        <Component {...props} />
        <Component {...props} />
      </React.Fragment>
    ));

    it("applies the passed HOC", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
