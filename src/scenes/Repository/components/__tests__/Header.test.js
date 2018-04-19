import { Header } from "../Header";
import { ThemeProvider } from "styled-components";

describe("Header", () => {
  set("component", () => (
    <Router>
      <ThemeProvider theme={{ sizes: { headerPadding: "1em" } }}>
        <Header
          match={{
            params: { organizationalUnitId: "ada", repositoryId: "testRepo" }
          }}
          data={{ repository: { description: "This is a test repository" } }}
        />
      </ThemeProvider>
    </Router>
  ));
  set("renderedComponent", () => render(component));

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
