import React from "react";
import { GlobalMenu } from "./global-menu";
import { MemoryRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../styles";

describe("GlobalMenu", () => {
  describe("signed out user", () => {
    it("matches the snapshot", () => {
      const wrapper = render(
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalMenu />
          </ThemeProvider>
        </Router>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("signed in user", () => {
    it("matches the snapshot", () => {
      const wrapper = render(
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalMenu
              me={{ id: "ada", emailHash: "3e3417d7ef77d5932a6734b916515ed5" }}
            />
          </ThemeProvider>
        </Router>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  it("contains the title link", () => {
    const wrapper = render(
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalMenu />
        </ThemeProvider>
      </Router>
    );
    expect(wrapper.find("a").text()).toContain("Ontohub");
  });
});
