import React from 'react'
import { Home, HomeHeader } from '../Home'
import renderer from 'react-test-renderer'

describe('Home', () => {
  const wrapper = renderer.create(<Home />)
  it('matches the snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})

describe('HomeHeader', () => {
  const wrapper = renderer.create(<HomeHeader />)
  it('matches the snapshot', () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
