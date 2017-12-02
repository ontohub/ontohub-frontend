import React from "react";
import { List } from "semantic-ui-react";
import styled from "react-emotion";

const Bold = styled("span")`
  font-weight: bold;
`;

export const Item = ({ icon, header, content }) => (
  <List.Item>
    <List.Icon name={icon} />
    <List.Content>
      <Bold>{header}</Bold>
      {" — "}
      {content}
    </List.Content>
  </List.Item>
);

export default Item;
