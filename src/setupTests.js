import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";
import styleSerializer from "jest-glamor-react";
import { sheet } from "emotion";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
expect.addSnapshotSerializer(styleSerializer(sheet));
