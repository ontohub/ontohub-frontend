import React from "react";
import { get } from "lodash";
import { Header as SemHeader, Container, Menu, Icon } from "semantic-ui-react";

const PureHeader = ({
  match: { params: { organizationalUnitId, repositoryId } }
}) => {
  console.log("Header");
  console.log(organizationalUnitId);
  console.log(repositoryId);
  return (
    <SemHeader inverted as="h1">
      Header
    </SemHeader>
  );
};

export const Header = PureHeader;
