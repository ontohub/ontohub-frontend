import React from "react";
import { Header } from "lib/header";
import { ThemeProvider } from "styled-components";

describe("Header", () => {
  it("matches the snapshot", () => {
    const wrapper = render(
      <ThemeProvider
        theme={{ colors: { dark: "#000" }, sizes: { contentWidth: "700px" } }}
      >
        <Header>Header content</Header>
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
