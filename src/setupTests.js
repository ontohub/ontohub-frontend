import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import "jest-styled-components";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
