import { PaddedContainer } from "lib/padded-container";
import { ThemeProvider } from "styled-components";

describe("PaddedContainer", () => {
  it("matches the snapshot", () => {
    const wrapper = render(
      <ThemeProvider theme={{ sizes: { headerPadding: "1em" } }}>
        <PaddedContainer>Header content</PaddedContainer>
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
