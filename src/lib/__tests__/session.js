import { SignIn, SignOut, signIn, signOut, mutation } from "lib/session";
import { __mocks__ } from "react-apollo";

const client = __mocks__.client;

describe("Session helpers", () => {
  describe("SignIn", () => {
    it("saves the token and resets the store", () => {
      mockResponse(mutation, {
        data: { signIn: { jwt: "some-token" } },
        called: true,
        error: false
      });
      render(<SignIn />);
      expect(localStorage.setItem.mock.calls.length).toBe(1);
      expect(client.resetStore.mock.calls.length).toBe(1);
    });

    it("calls the mutation", () => {
      mockResponse(mutation, {
        called: false
      });
      render(<SignIn username="ada" password="changemenow" />);
      expect(localStorage.setItem.mock.calls.length).toBe(0);
      expect(client.resetStore.mock.calls.length).toBe(0);
    });

    it("does nothing if no token was passed", () => {
      render(<SignIn />);
      expect(localStorage.setItem.mock.calls.length).toBe(0);
      expect(client.resetStore.mock.calls.length).toBe(0);
    });
  });

  describe("SignOut", () => {
    it("removes the token and resets the store", () => {
      render(<SignOut />);
      expect(client.resetStore.mock.calls.length).toBe(1);
      expect(localStorage.removeItem.mock.calls.length).toBe(1);
    });
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
