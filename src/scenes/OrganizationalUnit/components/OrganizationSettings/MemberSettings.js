import React, { Fragment } from "react";
import { NavLink as Link } from "react-router-dom";
import { Dropdown, Header, Table } from "semantic-ui-react";
import Gravatar from "react-gravatar";

const membershipRoles = [
  { key: "admin", value: "admin", text: "Admin" },
  { key: "read", value: "read", text: "Read" },
  { key: "write", value: "write", text: "Write" }
];

export const MemberSettings = ({ memberships }) => (
  <Fragment>
    <Header as="h3">Organization Members</Header>
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell width={4}>Role</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {memberships.map(({ member: { id, displayName, emailHash }, role }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Header as="h4" image>
                <Gravatar
                  key="avatar"
                  style={{ borderRadius: 2 }}
                  size={50}
                  md5={emailHash}
                  className="image"
                />
                <Header.Content>
                  <Link to={`/${id}`}>{displayName || id}</Link>

                  {displayName ? (
                    <Header.Subheader>{id}</Header.Subheader>
                  ) : null}
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Dropdown
                basic
                fluid
                selection
                onChange={(_, dropdown) => console.log(id, dropdown.value)}
                options={membershipRoles}
                defaultValue={role}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Fragment>
);
