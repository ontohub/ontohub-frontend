import React from 'react'
import VersionWarning from '../VersionWarning'
import { shallow } from 'enzyme'

describe('VersionWarning', () => {
  let requirement = '> v0.0.0-65'

  describe('version satisfies requirement', () => {
    let version = 'v0.0.0-88'

    it('is hidden', () => {
      const component = shallow(
        <VersionWarning requirement={requirement} version={version}/>
      )
      expect(component.getNode()).toBe(null)
    })
  })

  describe('version does not satisfy requirement', () => {
    let version = 'v0.0.0-65'

    it('matches snapshot', () => {
      const component = shallow(
        <VersionWarning requirement={requirement} version={version}/>
      )
      expect(component.getNode()).toMatchSnapshot()
    })
  })
})
