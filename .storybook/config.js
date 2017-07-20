/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react'
import 'semantic-ui-css/semantic.min.css'

const requireExtension = require.context('../src', true, /\.stories\.js$/)

function loadStories() {
  requireExtension.keys().forEach((filename) => requireExtension(filename))
}

configure(loadStories, module)
