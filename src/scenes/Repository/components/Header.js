import React from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { PaddedContainer } from "../../../components";
import { Header as SemHeader } from "semantic-ui-react";

const PureHeader = ({
  match: { params: { organizationalUnitId, repositoryId } },
  ...props
}) => {
  console.log(props);
  return (
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
};

export { PureHeader as Header };
