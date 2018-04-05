import React, { Fragment } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { withSaveOrganizationMutation } from "config/apollo/queries";
import { withFormik } from "formik";
import { Field } from "lib/field";
import { capitalize } from "lodash";
import { compose } from "recompose";

export const PureProfileSettings = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values
}) => (
  <Fragment>
    <Header as="h3">Organization Profile</Header>
    <Form error={errors._ && !!errors._[0]} onSubmit={handleSubmit}>
      {errors._ ? (
        <Message error icon="warning sign" header={errors._.join("\n")} />
      ) : null}
      <Field
        name="displayName"
        touched={touched.displayName}
        errors={errors.displayName}
        label="Display name"
        value={values.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Field
        name="description"
        touched={touched.description}
        errors={errors.description}
        label="Description"
        value={values.description}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Button type="submit" floated="right" positive>
        Update profile
      </Button>
    </Form>
  </Fragment>
);

const withFormikForm = withFormik({
  mapPropsToValues: /* istanbul ignore next */ ({
    displayName,
    description
  }) => {
    return { displayName, description };
  },
  handleSubmit: /* istanbul ignore next */ (
    values,
    { props: { saveOrganization }, setErrors }
  ) => {
    saveOrganization(values).catch(err => {
      let errors = { _: [] };
      let matches;
      let regex = /GraphQL error:\s*(.+)\s*$/gm;

      // eslint-disable-next-line no-cond-assign
      while ((matches = regex.exec(err.message))) {
        let message = capitalize(matches[1]);
        errors._.push(message);
      }

      setErrors(errors);
    });
  }
});

export const ProfileSettings = compose(
  withSaveOrganizationMutation,
  withFormikForm
)(PureProfileSettings);
