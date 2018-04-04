import { PDFViewer } from "../PDFViewer";

describe("PDFViewer", () => {
  set("component", () => <PDFViewer />);
  set("renderedComponent", () => render(component));

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
