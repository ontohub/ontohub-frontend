import { WarningMessage, VersionWarning, query } from "../version-warning";

describe("WarningMessage", () => {
  set("component", () =>
    shallow(
      <WarningMessage header="Message header" content="Message content" />
    )
  );
  it("matches the snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});

describe("VersionWarning", () => {
  set("component", () => render(<VersionWarning requirement={requirement} />));
  set("requirement", () => "> v0.0.0-65");

  describe("version could not be determined", () => {
    it("shows an error message", () => {
      mockResponse(query, { error: true });
      expect(component).toMatchSnapshot();
    });
  });

  describe("version is being loaded", () => {
    it("shows no message", () => {
      mockResponse(query, { loading: true });
      expect(component).toMatchSnapshot();
    });
  });

  describe("successful version retrieval", () => {
    describe("version satisfies requirement", () => {
      set("tag", () => "v0.0.0");
      set("commitsSinceTag", () => 88);

      it("is hidden", () => {
        mockResponse(query, {
          data: { version: { tag, commitsSinceTag } }
        });
        expect(component).toMatchSnapshot();
      });
    });

    describe("version does not satisfy requirement", () => {
      set("tag", () => "v0.0.0");
      set("commitsSinceTag", () => 65);

      it("matches the snapshot", () => {
        mockResponse(query, {
          data: { version: { tag, commitsSinceTag } }
        });
        expect(component).toMatchSnapshot();
      });
    });
  });
});
