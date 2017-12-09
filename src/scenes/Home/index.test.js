import React from "react";
import { Home, Header } from ".";
import { ThemeProvider } from "emotion-theming";
import { render } from "enzyme";
import theme from "../../styles";

describe("Home", () => {
  describe("Header", () => {
    it("matches the snapshot", () => {
      let wrapper = render(
        <ThemeProvider theme={theme}>
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
