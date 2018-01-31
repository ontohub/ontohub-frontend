import React from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Button,
  Confirm,
  Icon,
  Input,
  Dropdown,
  Header,
  Table
} from "semantic-ui-react";
import styled from "styled-components";
import Gravatar from "react-gravatar";

import { withFormik } from "formik";
import { compose, withState } from "recompose";
import {
  withAddOrganizationMemberMutation,
  withRemoveOrganizationMemberMutation
} from "../../../../apollo/queries";

const membershipRoles = [
  { key: "read", value: "read", text: "Read" },
  { key: "write", value: "write", text: "Write" },
  { key: "admin", value: "admin", text: "Admin" }
];

const NarrowIcon = styled(Icon)`
  height: 0 !important;
  width: 0 !important;
  padding: 0 1px;
  margin-top: -1em !important;
`;

export const PureMemberSettings = ({
  values,
  handleChange,
  handleSubmit,
  memberships,
  addOrganizationMember,
  removeOrganizationMember,
  popup,
  setPopup,
  me,
  id: organization
}) => (
  <form onSubmit={handleSubmit}>
    <Header as="h3">Organization Members</Header>
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell width={4}>Role</Table.HeaderCell>
          <Table.HeaderCell width={1} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row id="new_member">
          <Table.Cell>
            <Input
              fluid
              size="small"
              placeholder="Username"
              value={values.member}
              name="member"
              onChange={handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <Dropdown
              basic
              fluid
              selection
              options={membershipRoles}
              onChange={(e, data) => {
                e.target.name = "role";
                e.target.value = data.value;
                handleChange(e);
              }}
              value={values.role}
            />
          </Table.Cell>
          <Table.Cell>
            <Button primary onClick={handleSubmit}>
              <NarrowIcon name="plus" />
            </Button>
          </Table.Cell>
        </Table.Row>
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
                onChange={(e, { value: role }) =>
                  addOrganizationMember({ organization, id, role })
                }
                options={membershipRoles}
                value={role}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                negative
                onClick={e => {
                  e.preventDefault();
                  setPopup(id);
                }}
              >
                <NarrowIcon name="trash" />
              </Button>
              <Confirm
                open={popup === id}
                header={
                  <Header>
                    You are about to remove{" "}
                    {me && me.id === id ? (
                      "YOURSELF"
                    ) : (
                      <em>{displayName || id}</em>
                    )}{" "}
                    from this organization!
                  </Header>
                }
                onConfirm={() => {
                  setPopup(null);
                  removeOrganizationMember(popup);
                }}
                onCancel={setPopup}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </form>
);

const withFormikForm = withFormik({
  mapPropsToValues: /* istanbul ignore next */ ({ id: organization }) => ({
    member: "",
    role: "read",
    organization
  }),
  handleSubmit: /* istanbul ignore next */ (
    values,
    { props: { addOrganizationMember }, resetForm }
  ) => addOrganizationMember(values).then(resetForm)
});

export const MemberSettings = compose(
  withAddOrganizationMemberMutation,
  withRemoveOrganizationMemberMutation,
  withFormikForm,
  withState("popup", "setPopup", null)
)(PureMemberSettings);
