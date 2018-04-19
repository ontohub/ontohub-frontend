import { Repository } from "./";

describe("Repository", () => {
  set("component", () => (
    <Router>
      <Repository match={match} data={data} />
    </Router>
  ));
  set("renderedComponent", () => render(component));
  set("match", () => ({
    params: {
      organizationalUnitId: "ada",
      repositoryId: "testRepo",
      revision: revision
    }
  }));
  set("revision", () => undefined);

  describe("empty repository", () => {
    set("data", () => ({ loading: false }));
    it("matches the snapshot", () => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe("non-empty repository", () => {
    set("data", () => ({
      loading: false,
      repository: {
        defaultBranch: "master",
        branches: ["master", "develop"],
        commit: {}
      }
    }));

    describe("without revision", () => {
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });

    describe("with revision", () => {
      set("revision", () => "1234567890123456789012345678901234567890");
      it("matches the snapshot", () => {
        expect(renderedComponent).toMatchSnapshot();
      });
    });
  });
});
