import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import set from "jest-plugin-set";
import { render, mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Factories } from "lib/test-helpers/factories";
import { __mocks__ } from "react-apollo";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

if (!("localStorage" in global)) {
  global.localStorage = {
    _data: {},
    setItem: jest.fn(function(id, val) {
      return (this._data[id] = String(val));
    }),
    getItem: jest.fn(function(id) {
      return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    }),
    removeItem: jest.fn(function(id) {
      return delete this._data[id];
    }),
    clear: jest.fn(function() {
      return (this._data = {});
    }),
    clearMocks: function() {
      this.setItem.mockClear();
      this.getItem.mockClear();
      this.removeItem.mockClear();
      this.clear.mockClear();
    }
  };
}

afterEach(() => {
  __mocks__.clearResponses();
  __mocks__.client.resetStore.mockClear();
  localStorage.clearMocks();
});

global.getResponse = __mocks__.getResponse;
global.mockResponse = __mocks__.mockResponse;
global.clearResponses = __mocks__.clearResponses;
global.client = __mocks__.client;
global.set = set;
global.render = render;
global.mount = mount;
global.shallow = shallow;
global.React = React;
global.Router = MemoryRouter;
global.Factories = Factories;
