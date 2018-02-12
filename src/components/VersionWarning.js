import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { satisfies } from "semver";
import styled from "styled-components";
import { withVersionQuery } from "../apollo/queries";

const BottomMessage = styled(Message)`
  position: fixed !important;
  margin: -1px !important;
  border-radius: 0 !important;
  bottom: 0;
  width: calc(100% + 2px) !important;
`;

const WarningMessage = ({ icon, warning, ...props }: {}) => (
  <BottomMessage
    negative={!warning}
    warning={warning}
    icon={icon || "warning sign"}
    {...props}
  />
);

export { WarningMessage };

export class VersionWarning extends Component {
  render() {
    if (this.props.error) {
      return (
        <WarningMessage
          icon="plug"
          warning
          header="Could not determine backend version"
          content="This could mean that the backend is currently offline"
        />
      );
    }
    const validVersion =
      this.props.loading ||
      satisfies(this.props.version, this.props.requirement);

    return validVersion ? null : (
      <WarningMessage
        header="The connected backend does not meet the version requirement"
        content={
          <p>
            Expected version <code>{this.props.version}</code> to satisfy
            requirement <code>{this.props.requirement}</code>
            . Be aware that this may cause problems.
          </p>
        }
      />
    );
  }
}

export const VersionWarningWithData = withVersionQuery(VersionWarning);

export default VersionWarningWithData;
