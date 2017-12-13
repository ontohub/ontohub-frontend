jest.mock("../../../apollo", () => ({
  Client: {
    query: ({ variables: { id: id } }) => {
      if (id === "bob") {
        return Promise.reject();
      } else {
        return Promise.resolve({ data: { organizationalUnit: id === "ada" } });
      }
    }
  }
}));

import {
  addError,
  formHasError,
  setServerErrors,
  validate,
  isUsernameAvailable
} from "../validation";

describe("addError", () => {
  it("adds an error if the field has no error", () => {
    let errors = { anotherField: ["Some Error message"] };
    addError(true, errors, "someField", "This is the error message");
    expect(errors).toMatchSnapshot();
  });

  it("adds an error if the field already has an error", () => {
    let errors = { someField: ["This is another error message"] };
    addError(true, errors, "someField", "This is the error message");
    expect(errors).toMatchSnapshot();
  });
});

describe("formHasError", () => {
  it("returns true if one of the relevant fields has an error", () => {
    let errors = { name: ["This is an error"] };
    expect(formHasError(errors)).toBeTruthy();
  });

  it("returns false if none of the relevant fields has an error", () => {
    let errors = { otherField: ["This is an error"] };
    expect(formHasError(errors)).toBeFalsy();
  });
});

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

describe("isUsernameAvailable", () => {
  it("resolves", () => {
    return isUsernameAvailable("ada").then(available => {
      expect(available).toBeFalsy();
    });
  });
});

describe("validate", () => {
  it("on empty fields", () => {
    return validate({})
      .catch(e => e)
      .then(e => {
        expect(e).toMatchSnapshot();
      });
  });

  it("on some non-empty fields", () => {
    return validate({ name: "_._", confirmPassword: "notMatchingPassword" })
      .catch(e => e)
      .then(e => {
        expect(e).toMatchSnapshot();
      });
  });

  it("checks for username availability", () => {
    return validate({
      name: "ada",
      email: "ada@example.com",
      password: "matchingPassword",
      confirmPassword: "matchingPassword"
    })
      .catch(e => e)
      .then(e => {
        expect(e).toMatchSnapshot();
      });
  });

  it("returns an error if availability cannot be checked", () => {
    return validate({
      name: "bob",
      email: "ada@example.com",
      password: "matchingPassword",
      confirmPassword: "matchingPassword"
    })
      .catch(e => e)
      .then(e => {
        expect(e).toMatchSnapshot();
      });
  });
});
