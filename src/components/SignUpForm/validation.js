import { Client, userQuery } from "../../apollo";
import {
  get,
  isEmpty,
  filter,
  pick,
  forEach,
  compact,
  capitalize
} from "lodash";
import debounce from "debounce-promise";

const isUsernameAvailable = id =>
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

const addError = (condition, errors, field, error) => {
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
        values.password.length < 10,
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
        values.name.length < 3,
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
      if (formHasError(errors)) {
        throw errors;
      } else {
        return errors;
      }
    })
    .then(errors => {
      if (!errors.name) {
        return isUsernameAvailableDebounced(values.name).then(
          available => {
            addError(!available, errors, "name", "Username is already taken");
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
      }
    });
};

export const setServerErrors = (setErrors, setSubmitting, onError) => err => {
  let errors = {};

  forEach(compact(err.message.split("GraphQL error: ")), message => {
    let [field] = message.split(" ");
    if (!errors[field]) errors[field] = [];
    errors[field].push(capitalize(message));
  });

  setErrors(errors);
  setSubmitting(false);
  onError();
};
