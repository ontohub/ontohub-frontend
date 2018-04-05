import { withRefs } from "../withRefs";

describe("withRefs", () => {
  it("renders without error", () => {
    const Comp = withRefs({
      foo: "bar"
    })(props => <div>Works</div>);

    expect(() => render(<Comp />)).not.toThrow();
  });
});
