import React from 'react'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import SignUpForm from '../SignUpForm'

jest.genMockFromModule('zxcvbn')

describe('SignUpForm', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SignUpForm />)
  })
  it('matches the snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  describe('onSubmit', () => {
    describe('error', () => {
      let onError, onSubmit, validations

      beforeAll(() => {
        onError = jest.fn()
        onSubmit = () => Promise.reject()
        validations = {
          username: ['is invalid', 'is too short'],
          email: ['is invalid'],
          password: ['is invalid'],
          passwordConfirm: ['is invalid']
        }
        wrapper = mount(
          <SignUpForm
            validations={validations}
            onSubmit={onSubmit}
            onError={onError}
          />
        )
        wrapper.node.onSubmit({ preventDefault: jest.fn() })
      })

      it('matches the snapshot', () => {
        expect(toJSON(wrapper)).toMatchSnapshot()
      })

      it('calls the error callback', () => {
        expect(onError.mock.calls.length).toBe(1)
      })
    })

    describe('success', () => {
      let onSuccess, onSubmit, validations

      beforeAll(() => {
        onSuccess = jest.fn()
        onSubmit = () => Promise.resolve()
        validations = {}
        wrapper = mount(
          <SignUpForm
            validations={validations}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
          />
        )
        wrapper.node.onSubmit({ preventDefault: jest.fn() })
      })
    })
  })

  describe('Password score', () => {
    beforeAll(() => {
      wrapper = mount(<SignUpForm />)
    })

    it('is calculated when the password is changed', () => {
      let oldScore = wrapper.state('passwordScore')
      wrapper.find('#sign-up-password').simulate('change', {
        target: { value: 'areallylongpasswordthatshouldgetareallyhighscore' },
        no_validation: true
      })
      expect(wrapper.state('passwordScore')).not.toEqual(oldScore)
    })
  })
})
