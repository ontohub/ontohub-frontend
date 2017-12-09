import React from "react";
import { Header, PaddedContainer } from "../Header";
import { render } from "enzyme";

describe("Header", () => {
  it("matches the snapshot", () => {
    const wrapper = render(<Header>Header content</Header>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("PaddedContainer", () => {
  it("matches the snapshot", () => {
    const wrapper = render(<PaddedContainer>Header content</PaddedContainer>);
    expect(wrapper).toMatchSnapshot();
  });
});
