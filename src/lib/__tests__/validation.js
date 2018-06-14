import { setServerErrors } from "lib/validation";

describe("setServerErrors", () => {
  let setErrors;
  let setSubmitting;
  let onError;

  beforeEach(() => {
    setErrors = jest.fn();
    setSubmitting = jest.fn();
    onError = jest.fn();
    setServerErrors(setErrors, setSubmitting, onError)({
      message: `
        GraphQL error: Username not found
        GraphQL error: Password is missing
      `
    });
  });
  it("calls setErrors with the found errors", () => {
    expect(setErrors.mock.calls).toMatchSnapshot();
  });
  it("calls setSubmitting", () => {
    expect(setSubmitting.mock.calls).toEqual([[false]]);
  });
  it("calls onError", () => {
    expect(onError.mock.calls.length).toEqual(1);
  });

  describe("with an invalid error message", () => {
    beforeEach(() => {
      setErrors = jest.fn();
      setSubmitting = jest.fn();
      onError = jest.fn();
      setServerErrors(setErrors, setSubmitting, onError)({
        message: "This is an invalid error message"
      });
    });

    it("calls setErrors with the found errors", () => {
      expect(setErrors.mock.calls).toMatchSnapshot();
    });
  });
});
