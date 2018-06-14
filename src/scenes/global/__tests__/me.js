import { MeContext, MeProvider, query } from "../me";

describe("MeProvider", () => {
  set("component", () =>
    render(
      <MeProvider>
        <MeContext.Consumer>
          {me => (
            <React.Fragment>
              <h1>{me && me.id}</h1>
              <h2>{me && me.emailHash}</h2>
            </React.Fragment>
          )}
        </MeContext.Consumer>
      </MeProvider>
    )
  );

  describe("no data loaded", () => {
    set("mockedResponse", () => ({
      loading: true
    }));

    it("matches the snapshot", () => {
      mockResponse(query, mockedResponse);
      expect(component).toMatchSnapshot();
    });
  });

  describe("Loaded data", () => {
    set("mockedResponse", () => ({
      data: {
        me: { id: "ada", emailHash: "14758f1afd44c09b7992073ccf00b43d" }
      }
    }));

    it("matches the snapshot", () => {
      mockResponse(query, mockedResponse);
      expect(component).toMatchSnapshot();
    });
  });
});
