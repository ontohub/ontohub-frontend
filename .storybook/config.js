/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, setAddon } from "@storybook/react";
import infoAddon from "@storybook/addon-info";

const requireExtension = require.context("../src", true, /\.stories\.js$/);

function loadStories() {
  requireExtension.keys().forEach(filename => requireExtension(filename));
}

setAddon(infoAddon);
configure(loadStories, module);
