import { PureMemberSettings, MemberSettings } from "../member-settings";

describe("PureMemberSettings", () => {
  set("component", () => (
    <Router>
      <PureMemberSettings
        addOrganizationMember={addOrganizationMember}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        me={me}
        memberships={memberships}
        popup={popup}
        removeOrganizationMember={removeOrganizationMember}
        setPopup={setPopup}
        values={values}
      />
    </Router>
  ));

  set("renderedComponent", () => render(component));
  set("wrapper", () => mount(component));

  set("addOrganizationMember", () => jest.fn());
  set("handleChange", () => jest.fn());
  set("handleSubmit", () => jest.fn());
  set("me", () => Factories.User());
  set("memberships", () => [
    {
      member: Factories.User({ id: "ada", displayName: "Ada Lovelace" }),
      role: "admin"
    }
  ]);
  set("popup", () => null);
  set("removeOrganizationMember", () => jest.fn());
  set("removeOrganizationMemberWrapper", () =>
    jest.fn(() => removeOrganizationMember)
  );
  set("setPopup", () => jest.fn());
  set("values", () => ({ member: "", role: "read" }));

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  describe("New member form", () => {
    set("newMemberWrapper", () => wrapper.find("#new_member"));

    it("Calls onChange when changing the role", () => {
      newMemberWrapper.find("Dropdown").simulate("change", {});
      expect(handleChange.mock.calls.length).toEqual(1);
    });

    it("Calls onChange when changing the name", () => {
      newMemberWrapper.find("input[name='member']").simulate("change", {});
      expect(handleChange.mock.calls.length).toEqual(1);
    });

    it("calls the onSubmit callback when the add button is clicked", () => {
      newMemberWrapper.find("Button").simulate("click", {});
      expect(handleSubmit.mock.calls.length).toEqual(1);
    });
  });

  describe("member list", () => {
    it("calls the addOrganizationMember callback when changing a role", () => {
      wrapper
        .find("Dropdown")
        .at(1)
        .simulate("change", {});
      expect(addOrganizationMember.mock.calls.length).toEqual(1);
    });

    describe("Confirmation popup", () => {
      it("opens the popup when removing a user", () => {
        wrapper
          .find("Button")
          .at(1)
          .simulate("click", {});
        expect(setPopup.mock.calls.length).toEqual(1);
      });

      describe("Open popup", () => {
        set("popup", () => "ada");

        it("calls remove member callbacks", () => {
          wrapper
            .find("Confirm")
            .instance()
            .props.onConfirm();

          expect(removeOrganizationMember.mock.calls.length).toEqual(1);
          expect(setPopup.mock.calls.length).toEqual(1);
        });

        it("closes the popup when clicking cancel", () => {
          wrapper
            .find("Confirm")
            .instance()
            .props.onCancel();

          expect(setPopup.mock.calls.length).toEqual(1);
        });
      });
    });
  });
});
