import { signIn, signOut } from "../session";

describe("Session helpers", () => {
  let client;
  beforeEach(() => {
    global.localStorage = {
      setItem: jest.fn(),
      removeItem: jest.fn()
    };
    client = {
      resetStore: jest.fn()
    };
  });

  describe("signIn", () => {
    it("saves the token and resets the store", () => {
      signIn(client, "some-token");
      expect(client.resetStore.mock.calls.length).toBe(1);
      expect(localStorage.setItem.mock.calls.length).toBe(1);
    });
    it("does nothing if no token was passed", () => {
      signIn(client);
      expect(client.resetStore.mock.calls.length).toBe(0);
      expect(localStorage.setItem.mock.calls.length).toBe(0);
    });
  });
  describe("signOut", () => {
    it("removes the token and resets the store", () => {
      signOut(client);
      expect(client.resetStore.mock.calls.length).toBe(1);
      expect(localStorage.removeItem.mock.calls.length).toBe(1);
    });
  });
});
