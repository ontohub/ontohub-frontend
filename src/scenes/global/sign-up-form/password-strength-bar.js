import React from "react";
import { Progress } from "semantic-ui-react";

export const PasswordStrengthBar = ({ score }) => (
  <Progress
    attached="bottom"
    title={`Password strength: ${
      ["Very weak", "Weak", "Okay", "Strong", "Very strong"][score]
    }`}
    style={{ marginTop: -3 }}
    percent={score * 25}
    color={["red", "orange", "yellow", "olive", "green"][score]}
  />
);
