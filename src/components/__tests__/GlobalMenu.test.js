import React from 'react'
import GlobalMenu from '../GlobalMenu'
import { MemoryRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { render } from 'enzyme'

describe('GlobalMenu', () => {
  it('matches the snapshot', () => {
    const wrapper = renderer.create(<Router><GlobalMenu /></Router>)
    expect(wrapper).toMatchSnapshot()
  })
  it('contains the title link', () => {
    const wrapper = render(<Router><GlobalMenu /></Router>)
    expect(wrapper.find('a').text()).toContain('Ontohub')
  })
})
