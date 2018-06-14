import React from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { PaddedContainer } from "lib/padded-container";
import { Header as SemHeader } from "semantic-ui-react";

const PureHeader = ({
  match: { params: { organizationalUnitId, repositoryId } },
  ...props
}) => (
  <PaddedContainer>
    <SemHeader inverted as="h2">
      <Link to={`/${organizationalUnitId}`}>{organizationalUnitId}</Link> /{" "}
      {repositoryId}
      <SemHeader.Subheader key="description">
        {get(props, "data.repository.description")}
      </SemHeader.Subheader>
    </SemHeader>
  </PaddedContainer>
);

export { PureHeader as Header };
