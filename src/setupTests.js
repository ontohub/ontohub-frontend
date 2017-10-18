import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "enzyme-to-json/serializer";

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = function(callback) {};
