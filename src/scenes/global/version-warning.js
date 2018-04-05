import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Message } from "semantic-ui-react";
import { satisfies } from "semver";
import styled from "styled-components";

const query = gql`
  query GetVersion {
    version {
      tag
      commitsSinceTag
    }
  }
`;

const BottomMessage = styled(Message)`
  position: fixed !important;
  margin: -1px !important;
  border-radius: 0 !important;
  bottom: 0;
  width: calc(100% + 2px) !important;
`;

const WarningMessage = ({ icon, warning, ...props } = {}) => (
  <BottomMessage
    negative={!warning}
    warning={!!warning}
    icon={icon || "warning sign"}
    {...props}
  />
);

const VersionWarning = ({ requirement }) => (
  <Query query={query}>
    {({ error, loading, data }) => {
      if (error) {
        return (
          <WarningMessage
            icon="plug"
            warning
            header="Could not determine backend version"
            content="This could mean that the backend is currently offline"
          />
        );
      } else if (loading) {
        return null;
      }
      const { tag, commitsSinceTag } = data.version;
      const version = `${tag}-${commitsSinceTag}`;
      const validVersion = satisfies(version, requirement);

      return validVersion ? null : (
        <WarningMessage
          header="The connected backend does not meet the version requirement"
          content={
            <p>
              Expected version <code>{version}</code> to satisfy requirement{" "}
              <code>{requirement}</code>
              . Be aware that this may cause problems.
            </p>
          }
        />
      );
    }}
  </Query>
);

export { VersionWarning, WarningMessage, query };
