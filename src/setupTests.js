import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import set from "jest-plugin-set";
import { render, mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Factories from "./test-helpers/factories";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

global.set = set;
global.render = render;
global.mount = mount;
global.shallow = shallow;
global.React = React;
global.Router = MemoryRouter;

global.Seeds = {
  organizationalUnit: {
    "seed-user-organization": {
      __typename: "Organization",
      id: "seed-user-organization",
      displayName: "Seed User Organization",
      description: "An Organization for all seed users"
    },
    ada: {
      __typename: "User",
      id: "ada",
      displayName: "Ada Lovelace",
      emailHash: "3e3417d7ef77d5932a6734b916515ed5"
    }
  }
};

global.Factories = Factories;
