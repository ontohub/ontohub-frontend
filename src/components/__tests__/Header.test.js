import React from 'react'
import Header from '../Header'
import { shallow } from 'enzyme'

describe('Header', () => {
  it('matches the snapshot', () => {
    const component = shallow(
      <Header>
        Header content
      </Header>
    )
    expect(component.getNode()).toMatchSnapshot()
  })
})
