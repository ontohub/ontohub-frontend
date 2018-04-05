import React from "react";
import { PureGlobalMenu as GlobalMenu } from "../global-menu";
import { MemoryRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MeContext } from "../me";
import theme from "config/theme";

describe("GlobalMenu", () => {
  set("me", () => undefined);
  set("component", () =>
    render(
      <MeContext.Provider value={me}>
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalMenu />
          </ThemeProvider>
        </Router>
      </MeContext.Provider>
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
