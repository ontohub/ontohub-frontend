import { capitalize } from "lodash";

export const setServerErrors = (setErrors, setSubmitting, onError) => err => {
  let errors = {};
  let matches;
  let regex = /GraphQL error:\s*((\S+) .+)\s*$/gm;

  // eslint-disable-next-line no-cond-assign
  while ((matches = regex.exec(err.message))) {
    let field = matches[2].toLowerCase();
    let message = capitalize(matches[1]);
    if (!errors[field]) errors[field] = [];
    errors[field].push(message);
  }

  setErrors(errors);
  setSubmitting(false);
  onError();
};
