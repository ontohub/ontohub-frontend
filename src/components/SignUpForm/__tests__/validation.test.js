import {
  addError,
  formHasError,
  validate,
  isUsernameAvailable
} from "../validation";

jest.mock("config/apollo", () => ({
  Client: {
    query: ({ variables: { id } }) => {
      if (id === "bob") {
        return Promise.reject();
      } else {
        return Promise.resolve({ data: { organizationalUnit: id === "ada" } });
      }
    }
  }
}));

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
