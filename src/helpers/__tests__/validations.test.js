import validate, { userValidations } from "../validations";

describe("validate", () => {
  let validations = {
    num: [({ num }) => num < 4 || "is too big"]
  };

  it("validates with errors", () =>
    validate(validations, { num: 5 }).then(errors => {
      expect(errors.num.length).toBe(1);
    }));

  it("validates without errors", () =>
    validate(validations, { num: 2 }).then(errors => {
      expect(errors.num).toBeFalsy();
    }));
});

describe("User validations", () => {
  let validations;
  let queryReturn;
  beforeEach(() => {
    queryReturn = Promise.resolve({ data: { organizationalUnit: {} } });
    let query = jest.fn().mockReturnValue(queryReturn);
    let client = {
      query
    };
    validations = userValidations(client);
  });

  describe("Username", () => {
    describe("Length", () => {
      it("returns an error if the username is too short", () =>
        validate(validations, { username: "a" }).then(({ username = [] }) => {
          expect(username).toContain(
            "Username must be at least 3 characters long"
          );
        }));

      it("returns no error if the username is long enough", () =>
        validate(validations, { username: "abc" }).then(({ username = [] }) => {
          expect(username).not.toContain(
            "Username must be at least 3 characters long"
          );
        }));
    });

    describe("Free", () => {
      it("returns an error if the username is already taken", () =>
        validate(validations, { username: "abc" }).then(({ username = [] }) => {
          expect(username).toContain("Username is already taken");
        }));

      it("returns no error if the username is not taken", () => {
        let queryReturn = Promise.resolve({
          data: { organizationalUnit: null }
        });
        let query = jest.fn().mockReturnValue(queryReturn);
        let client = {
          query
        };
        let validations = userValidations(client);

        return validate(validations, {
          username: "abc"
        }).then(({ username }) => {
          expect(username || []).not.toContain("Username is already taken");
        });
      });

      it("returns an error if the username could not be checked", () => {
        let queryReturn = Promise.reject();
        let query = jest.fn().mockReturnValue(queryReturn);
        let client = {
          query
        };
        let validations = userValidations(client);

        return validate(validations, {
          username: "abc"
        }).then(({ username = [] }) => {
          expect(username).toContain(
            "Username could not be checked for availability"
          );
        });
      });
    });
  });

  describe("Password", () => {
    describe("Length", () => {
      it("returns an error if the password is too short", () =>
        validate(validations, { password: "" }).then(({ password = [] }) => {
          expect(password).toContain(
            "Password must be at least 10 characters long"
          );
        }));

      it("returns no error if the password is long enough", () =>
        validate(validations, {
          password: "abcdefghijklmn"
        }).then(({ password }) => {
          expect(password).toBeFalsy();
        }));
    });

    describe("Equality of password and passwordConfirm", () => {
      it("returns an error if the passwords do not match", () =>
        validate(validations, {
          password: "foo",
          passwordConfirm: "bar"
        }).then(({ passwordConfirm = [] }) => {
          expect(passwordConfirm).toContain(
            "PasswordConfirm must match the password"
          );
        }));

      it("returns no error if the passwords do match", () =>
        validate(validations, {
          password: "foo",
          passwordConfirm: "foo"
        }).then(({ passwordConfirm }) => {
          expect(passwordConfirm).toBeFalsy();
        }));
    });
  });
});
