import { ImageViewer } from "../ImageViewer";

describe("ImageViewer", () => {
  set("component", () => (
    <ImageViewer
      filename="test.png"
      encoding="base64"
      value="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="
    />
  ));
  set("renderedComponent", () => render(component));

  it("matches the snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
