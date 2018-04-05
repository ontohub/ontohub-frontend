/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, setAddon } from "@storybook/react";
import infoAddon from "@storybook/addon-info";
import "semantic-ui-css/semantic.min.css";

const requireExtension = require.context(
  "../src",
  true,
  /\/__stories__\/.+\.jsx?$/
);

function loadStories() {
  requireExtension.keys().forEach(filename => requireExtension(filename));
}

setAddon(infoAddon);
configure(loadStories, module);
