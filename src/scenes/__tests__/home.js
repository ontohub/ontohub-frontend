import React from "react";
import { Home, Header } from "../home";
import { ThemeProvider } from "styled-components";

describe("Home", () => {
  describe("Header", () => {
    it("matches the snapshot", () => {
      let wrapper = render(
        <ThemeProvider theme={{ sizes: { headerPadding: "1em" } }}>
          <Header />
        </ThemeProvider>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Body", () => {
    it("matches the snapshot", () => {
      let wrapper = render(<Home />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
