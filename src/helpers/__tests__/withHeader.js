import React from 'react'
import { withHeader } from '../withHeader'
import { shallow } from 'enzyme'

describe('withHeader', () => {
  const Component = withHeader('h1', 'p'),
        wrapper = shallow(<Component />)
  it('matches the snapshot', () => {
    expect(wrapper.getNode()).toMatchSnapshot()
  })

  it('renders the header and the content', () => {
    expect(wrapper.find('h1').length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)
  })
})
