import { HeadAndBody } from "lib/head-and-body";
import { ThemeProvider } from "styled-components";

describe("HeadAndBody", () => {
  set("component", () => (
    <ThemeProvider
      theme={{ colors: { dark: "#000" }, sizes: { contentWidth: "700px" } }}
    >
      <HeadAndBody
        head={() => <h1>Head</h1>}
        body={() => <div>Body</div>}
        hoc={Component => props => <Component {...props} className="HOCed" />}
      />
    </ThemeProvider>
  ));
  set("renderedComponent", () => render(component));

  it("applies the HOC to head and body", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
