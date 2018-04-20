import { File } from "../file";

jest.mock("react-pdf-js");

describe("File", () => {
  set("component", () => (
    <File filename={filename} isEditingPermitted={isEditingPermitted} />
  ));
  set("mountedComponent", () => mount(component));

  set("isEditingPermitted", () => true);

  describe("image file", () => {
    set("filename", () => "test.png");
    it("renders the image", () => {
      expect(mountedComponent.find("img").length).toBe(1);
    });
  });

  describe("PDF file", () => {
    set("filename", () => "test.pdf");
    it("renders the pdf", () => {
      expect(mountedComponent.find("react-pdf-js").length).toBe(1);
    });
  });

  describe("Downloadable file", () => {
    set("filename", () => "test.tar");
    it("renders the download button", () => {
      expect(mountedComponent.find("DownloadButton").length).toBeGreaterThan(0);
    });
  });

  describe("text file", () => {
    set("filename", () => "test.md");
    it("renders an editor", () => {
      expect(mountedComponent.find("ReactMarkdown").length).toBe(1);
    });
  });

  describe("text file", () => {
    set("filename", () => "test.txt");
    set("isEditingPermitted", () => false);
    it("renders an editor", () => {
      expect(mountedComponent.find("PureEditor").length).toBe(1);
    });
  });
});
