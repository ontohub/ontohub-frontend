import React from "react";
import { shallow, mount } from "enzyme";
import _ from "lodash";
import SignUpForm from "../SignUpForm";

jest.genMockFromModule("zxcvbn");

describe("SignUpForm", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SignUpForm />);
  });
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("Password score", () => {
    let errorsPromise;

    beforeAll(() => {
      wrapper = mount(
        <SignUpForm validationCallback={errors => (errorsPromise = errors)} />
      );
    });

    it("is calculated when the password is changed", () => {
      let oldScore = wrapper.find("PasswordStrengthBar").props().score;
      wrapper.find("input#sign-up-password").simulate("change", {
        target: {
          value: "areallylongpasswordthatshouldgetareallyhighscore",
          name: "password"
        }
      });
      return errorsPromise.catch(errors =>
        expect(errors.passwordScore).not.toEqual(oldScore)
      );
    });
  });
});
