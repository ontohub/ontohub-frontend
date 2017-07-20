import React from 'react'

import { storiesOf } from '@storybook/react'

import VersionWarning from '../VersionWarning'

storiesOf('VersionWarning', module)
  .add('not fulfilling the requirement', () =>
    <VersionWarning requirement="~ 0.1.0" version="0.2.1" />
  )
  .add('unreachable server', () => <VersionWarning error={true} />)
  .add('fulfilling the requirement', () =>
    <VersionWarning requirement="~ 0.1.0" version="0.1.1" />
  )
