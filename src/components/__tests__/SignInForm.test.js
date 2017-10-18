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

  describe("onSubmit", () => {
    describe("error", () => {
      let onError;

      beforeAll(() => {
        onError = jest.fn();
        wrapper = mount(
          <SignInForm onSubmit={() => Promise.reject()} onError={onError} />
        );
        wrapper
          .instance()
          .onSubmit({ preventDefault: jest.fn() })
          // Somehow enzyme does not update the wrapper's state
          .then(() => wrapper.setState({ error: true }));
      });

      it("matches the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });

      it("sets the error state to true", () => {
        expect(wrapper.state("error")).toBeTruthy();
      });
      it("calls the error callback", () => {
        expect(onError.mock.calls.length).toBe(1);
      });
    });

    describe("success", () => {
      let onSuccess;

      beforeAll(() => {
        onSuccess = jest.fn();
        wrapper = mount(
          <SignInForm
            onSubmit={() => Promise.resolve()}
            onSuccess={onSuccess}
          />
        );
        wrapper.instance().onSubmit({ preventDefault: jest.fn() });
      });

      it("sets the error state to false", () => {
        expect(wrapper.state("error")).toBeFalsy();
      });
      it("calls the success callback", () => {
        expect(onSuccess.mock.calls.length).toBe(1);
      });
    });
  });
});
