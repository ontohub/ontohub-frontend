import React from 'react'
import { WarningMessage, VersionWarning } from '../VersionWarning'
import { shallow } from 'enzyme'

describe('WarningMessage', () => {
  it('matches the snapshot', () => {
    const component = shallow(
      <WarningMessage header="Message header" content="Message content" />
    )
    expect(component.getElement()).toMatchSnapshot()
  })
})

describe('VersionWarning', () => {
  let requirement = '> v0.0.0-65'

  describe('version could not be determined', () => {
    it('shows an error message', () => {
      const component = shallow(
        <VersionWarning requirement={requirement} error />
      )
      expect(component.getElement()).toMatchSnapshot()
    })
  })

  describe('version satisfies requirement', () => {
    let version = 'v0.0.0-88'

    it('is hidden', () => {
      const component = shallow(
        <VersionWarning requirement={requirement} version={version} />
      )
      expect(component.getElement()).toBe(null)
    })
  })

  describe('version does not satisfy requirement', () => {
    let version = 'v0.0.0-65'

    it('matches the snapshot', () => {
      const component = shallow(
        <VersionWarning requirement={requirement} version={version} />
      )
      expect(component.getElement()).toMatchSnapshot()
    })
  })
})
