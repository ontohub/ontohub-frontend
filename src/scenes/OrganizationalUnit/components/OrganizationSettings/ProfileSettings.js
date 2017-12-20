import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { saveOrganizationMutation } from "../../../../apollo/queries";
import { withFormik } from "formik";
import { Field } from "../../../../components/SignUpForm/Field";
import { capitalize } from "lodash";
import { compose } from "recompose";

export const ProfileSettings = ({
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

export const ProfileSettingsWithData = compose(
  graphql(saveOrganizationMutation, {
    props: ({ mutate, ownProps: { id, ...props } }) => ({
      onSubmit: data => mutate({ variables: { id, data } }),
      ...props
    })
  }),
  withFormik({
    mapPropsToValues({ displayName, description }) {
      return { displayName, description };
    },
    handleSubmit(values, { props: { onSubmit }, setErrors }) {
      onSubmit(values).catch(err => {
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
  })
)(ProfileSettings);

export default ProfileSettingsWithData;
