import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import set from "jest-plugin-set";
import { render, mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Factories from "lib/test-helpers/factories";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

global.set = set;
global.render = render;
global.mount = mount;
global.shallow = shallow;
global.React = React;
global.Router = MemoryRouter;
global.Factories = Factories;
