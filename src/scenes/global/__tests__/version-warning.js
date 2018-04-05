import React from "react";
import { WarningMessage, VersionWarning } from "../version-warning";

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
      expect(component).toMatchSnapshot();
    });
  });

  describe("version satisfies requirement", () => {
    set("version", () => "v0.0.0-88");

    it("is hidden", () => {
      expect(component).toBe(null);
    });
  });

  describe("version does not satisfy requirement", () => {
    set("version", () => "v0.0.0-65");

    it("matches the snapshot", () => {
      expect(component).toMatchSnapshot();
    });
  });
});
