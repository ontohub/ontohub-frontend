import FileSaver from "file-saver";
import { Downloader } from "../downloader";

jest.mock("file-saver");

describe("DownloadButton", () => {
  set("component", () => (
    <Downloader
      filename="test.js"
      encoding={encoding}
      value="This is the test content"
    />
  ));
  set("renderedComponent", () => render(component));
  set("mountedComponent", () => mount(component));

  describe("with a plain text file", () => {
    set("encoding", () => "plain");

    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("with a base64-encoded text file", () => {
    set("encoding", () => "base64");

    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("clicking the button", () => {
    beforeAll(() => {
      FileSaver.saveAs = jest.fn();
    });

    it("calls saveAs", () => {
      mountedComponent.find("Button").simulate("click");
      expect(FileSaver.saveAs.mock.calls.length).toBe(1);
    });
  });
});
