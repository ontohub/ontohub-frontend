import React from "react";
import { Header, PaddedContainer } from "../Header";
import { ThemeProvider } from "emotion-theming";
import { render } from "enzyme";
import theme from "../../styles";

describe("Header", () => {
  it("matches the snapshot", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Header>Header content</Header>
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("PaddedContainer", () => {
  it("matches the snapshot", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <PaddedContainer>Header content</PaddedContainer>
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
