import React from 'react'
import GlobalMenu from '../GlobalMenu'
import { MemoryRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { render } from 'enzyme'

describe('GlobalMenu', () => {
  describe('signed out user', () => {
    it('matches the snapshot', () => {
      const wrapper = renderer.create(<Router><GlobalMenu /></Router>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('signed in user', () => {
    it('matches the snapshot', () => {
      const wrapper = renderer.create(
        <Router>
          <GlobalMenu currentUser={{ id: 'ada', email: 'ada@example.com' }} />
        </Router>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  it('contains the title link', () => {
    const wrapper = render(<Router><GlobalMenu /></Router>)
    expect(wrapper.find('a').text()).toContain('Ontohub')
  })
})
