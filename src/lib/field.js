import React from "react";
import { Form, Label } from "semantic-ui-react";

export const Field = ({
  bar,
  errors,
  fieldId,
  label,
  name,
  onBlur,
  onChange,
  touched,
  type,
  value
}) => (
  <Form.Field>
    <label htmlFor={fieldId}>{label}</label>
    <input
      id={fieldId}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={label}
      type={type}
      value={value}
    />
    {bar || null}
    {!!touched &&
      !!errors && (
        <Label pointing color="red">
          {errors.map(e => <div key={e}>{e}</div>)}
        </Label>
      )}
  </Form.Field>
);
