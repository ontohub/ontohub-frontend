import { Client, userQuery } from "config/apollo";
import { get, isEmpty, filter, pick } from "lodash";
import debounce from "debounce-promise";

export const isUsernameAvailable = id =>
  Client.query({ query: userQuery, variables: { id: id } }).then(
    data => !get(data, "data.organizationalUnit", null)
  );

const isUsernameAvailableDebounced = debounce(isUsernameAvailable, 500, {
  leading: true
});

export const formHasError = errors =>
  !isEmpty(
    filter(pick(errors, ["email", "name", "password", "confirmPassword"]))
  );

export const addError = (condition, errors, field, error) => {
  if (condition) {
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(error);
  }
};

export const validate = values => {
  return import("zxcvbn")
    .then(fn => {
      let errors = {};
      let scorePassword = password => fn(password).score;

      errors.passwordScore = scorePassword(values.password);

      addError(
        !values.password || values.password.length < 10,
        errors,
        "password",
        "Password must be at least 10 characters long"
      );
      addError(
        values.password !== values.confirmPassword,
        errors,
        "confirmPassword",
        "Passwords must match"
      );
      addError(
        !/^[^@]+@[^@]+$/.test(values.email),
        errors,
        "email",
        "Email is invalid"
      );
      addError(
        !values.name || values.name.length < 3,
        errors,
        "name",
        "Username must be at least 3 characters long"
      );
      addError(
        !/[a-z0-9][a-z0-9\-_]*[a-z0-9]/.test(values.name),
        errors,
        "name",
        "Username must start and end with a lower case letter " +
          "or number, and only contain lower case " +
          'letters, numbers, "-" and "_"'
      );
      return errors;
    })
    .then(errors => {
      /* istanbul ignore else */
      if (!errors.name) {
        return isUsernameAvailableDebounced(values.name).then(
          available => {
            addError(!available, errors, "name", "Username is already taken");
            /* istanbul ignore else */
            if (formHasError(errors)) {
              throw errors;
            } else {
              return errors;
            }
          },
          err => {
            addError(
              true,
              errors,
              "name",
              "Unable to check username availability. Please check your network connection."
            );
            throw errors;
          }
        );
      } else if (formHasError(errors)) {
        throw errors;
      } else {
        return errors;
      }
    });
};
