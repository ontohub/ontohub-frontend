import React from "react";
import { PureSignUpForm as SignUpForm } from "../sign-up-form";

const shallowRender = props => mount(<SignUpForm {...props} />);

describe("SignUpForm", () => {
  let wrapper;

  describe("initial state", () => {
    let onBlur;
    let onChange;
    let onSubmit;
    let touched = {};
    let errors = {};
    let values = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    beforeEach(() => {
      onChange = jest.fn();
      onBlur = jest.fn();
      onSubmit = jest.fn();
      wrapper = shallowRender({
        values,
        errors,
        touched,
        onBlur,
        onChange,
        onSubmit
      });
    });

    it("matches the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    [
      "#sign-up-username",
      "#sign-up-email",
      "#sign-up-password",
      "#sign-up-password-confirm"
    ].forEach(selector => {
      it(`calls onChange when changing the value of ${selector}`, () => {
        wrapper.find(selector).simulate("change", {});
        expect(onChange.mock.calls.length).toEqual(1);
      });

      it(`calls onBlur when blurring ${selector}`, () => {
        wrapper.find(selector).simulate("blur", {});
        expect(onBlur.mock.calls.length).toEqual(1);
      });
    });

    it("calls the onSubmit callback on submission", () => {
      wrapper.find("form").simulate("submit", {});
      expect(onSubmit.mock.calls.length).toEqual(1);
    });

    it("can disable the submission", () => {
      wrapper = shallowRender({
        values,
        errors,
        touched,
        onChange,
        onSubmit,
        submitEnabled: false
      });
      wrapper.find("form").simulate("submit", {});
      expect(onSubmit.mock.calls.length).toEqual(0);
    });

    it("can render a passed element (e.g. a captcha)", () => {
      let captcha = <div id="captcha-element" />;
      wrapper = shallowRender({
        values,
        errors,
        touched,
        onChange,
        onSubmit,
        captcha
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("error state", () => {
    let touched = { name: true };
    let errors = { name: ["Name is already taken"] };
    let values = {
      name: "ada",
      email: "",
      password: "",
      confirmPassword: ""
    };
    let onChange;

    beforeEach(() => {
      onChange = jest.fn();
      wrapper = shallowRender({ values, errors, touched, onChange });
    });

    it("matches the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
