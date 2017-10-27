import React from "react";
import { shallow, mount } from "enzyme";
import SignInForm from "../SignInForm";

describe("SignInForm", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SignInForm />);
  });

  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
