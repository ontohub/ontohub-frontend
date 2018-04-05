import React from "react";
import { PureGlobalMenu as GlobalMenu } from "../global-menu";
import { MemoryRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "config/theme";

describe("GlobalMenu", () => {
  set("me", () => undefined);
  set("component", () =>
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalMenu me={me} />
        </ThemeProvider>
      </Router>
    )
  );

  describe("signed out user", () => {
    it("matches the snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe("signed in user", () => {
    set("me", () => ({
      id: "ada",
      emailHash: "3e3417d7ef77d5932a6734b916515ed5"
    }));

    it("matches the snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });

  it("contains the title link", () => {
    expect(component.find("a").text()).toContain("Ontohub");
  });
});
