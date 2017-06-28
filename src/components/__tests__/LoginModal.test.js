import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import LoginModal from '../LoginModal'

describe('LoginModal', () => {
  let wrapper, onSignIn

  beforeAll(() => {
    // Polyfill requestAnimationFrame
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = jest.fn()
      window.cancelAnimationFrame = jest.fn()
    }
  })

  beforeEach(() => {
    onSignIn = jest.fn()
    wrapper = mount(<LoginModal open onSignIn={onSignIn} />)
  })

  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  describe('Callbacks', () => {
    describe('onSignInSubmit', () => {
      it('sets the state to loading', () => {
        wrapper.node.onSignInSubmit()
        expect(wrapper.state('loading')).toBeTruthy()
      })

      it('calls the passed function', () => {
        wrapper.node.onSignInSubmit()
        expect(onSignIn.mock.calls.length).toBe(1)
      })
    })
    describe('onSignUpSubmit', () => {
      it('sets the state to loading', () => {
        wrapper.node.onSignUpSubmit()
        expect(wrapper.state('loading')).toBeTruthy()
      })
    })
    describe('onError', () => {
      it('removes the loading state', () => {
        wrapper.node.onError()
        expect(wrapper.state('loading')).toBeFalsy()
      })
    })
    describe('onClose', () => {
      it('sets the open state to false', () => {
        wrapper.node.onClose()
        expect(wrapper.state('open')).toBeFalsy()
      })
    })
    describe('onClose', () => {
      it('sets the open state to true', () => {
        wrapper.node.onOpen()
        expect(wrapper.state('open')).toBeTruthy()
      })
    })
  })
})
