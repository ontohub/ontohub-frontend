import React from "react";
import LoginModal from "../LoginModal";

describe("LoginModal", () => {
  let wrapper, onSignIn, onSignUp;

  beforeEach(() => {
    onSignIn = jest.fn();
    onSignUp = jest.fn();
    wrapper = mount(
      <LoginModal open onSignIn={onSignIn} onSignUp={onSignUp} />
    );
  });

  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("Callbacks", () => {
    describe("onSignInSubmit", () => {
      it("sets the state to loading", () => {
        wrapper.instance().onSignInSubmit();
        expect(wrapper.state("loading")).toBeTruthy();
      });

      it("calls the passed function", () => {
        wrapper.instance().onSignInSubmit();
        expect(onSignIn.mock.calls.length).toBe(1);
      });
    });
    describe("onSignUpSubmit", () => {
      it("sets the state to loading", () => {
        wrapper.instance().onSignUpSubmit({});
        expect(wrapper.state("loading")).toBeTruthy();
      });

      it("calls the passed function", () => {
        wrapper.instance().onSignUpSubmit({});
        expect(onSignUp.mock.calls.length).toBe(1);
      });
    });
    describe("onError", () => {
      it("removes the loading state", () => {
        wrapper.instance().onError();
        expect(wrapper.state("loading")).toBeFalsy();
      });
    });
    describe("onClose", () => {
      it("sets the open state to false", () => {
        wrapper.instance().onClose();
        expect(wrapper.state("open")).toBeFalsy();
      });
    });
    describe("onClose", () => {
      it("sets the open state to true", () => {
        wrapper.instance().onOpen();
        expect(wrapper.state("open")).toBeTruthy();
      });
    });
  });
});
