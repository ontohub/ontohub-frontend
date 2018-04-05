import React from "react";
import { SignInForm } from "../sign-in-form";

describe("SignInForm", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = render(<SignInForm />);
  });

  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
