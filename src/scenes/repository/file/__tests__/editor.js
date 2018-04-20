import { Editor } from "../editor";

describe("Editor", () => {
  set("component", () => (
    <Editor
      filename="test.js"
      value="This is the test content"
      isEditingInitially={isEditing}
      isEditingPermitted={true}
    />
  ));
  set("mountedComponent", () => mount(component));

  describe("Reading Mode", () => {
    set("isEditing", () => false);

    it("matches the snapshot", () => {
      expect(mountedComponent).toMatchSnapshot();
    });

    it("matches the snapshot after clicking the toggle", () => {
      mountedComponent
        .find("Button")
        .first()
        .simulate("click");
      expect(mountedComponent).toMatchSnapshot();
    });
  });

  describe("Editing Mode", () => {
    set("isEditing", () => true);

    it("matches the snapshot", () => {
      expect(mountedComponent).toMatchSnapshot();
    });

    it("matches the snapshot after clicking the toggle", () => {
      mountedComponent
        .find("Button")
        .first()
        .simulate("click");
      expect(mountedComponent).toMatchSnapshot();
    });
  });
});
