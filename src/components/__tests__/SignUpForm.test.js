import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'
import SignUpForm from '../SignUpForm'

jest.genMockFromModule('zxcvbn')

describe('SignUpForm', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SignUpForm />)
  })
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
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
            enableCaptcha={false}
          />
        )
        wrapper.instance().onSubmit({ preventDefault: jest.fn() })
      })

      it('matches the snapshot', () => {
        wrapper.setState({ error: true })
        expect(wrapper).toMatchSnapshot()
      })

      it('calls the error callback', () => {
        expect(onError.mock.calls.length).toBe(1)
      })
    })

    describe('success', () => {
      let onSuccess, onSubmit, validations

      beforeAll(() => {
        onSuccess = jest.fn()
        onSubmit = jest.fn(() => Promise.resolve())
        validations = {}
        wrapper = mount(
          <SignUpForm
            validations={validations}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            enableCaptcha={false}
          />
        )
        _.each(['username', 'email', 'password'], v => {
          wrapper.instance().fields[v].value = v
        })
        wrapper.instance().onSubmit({ preventDefault: jest.fn() })
      })

      it('has not yet loaded recaptcha', () => {
        expect(wrapper.instance().state.captchaLoaded).toBeFalsy()
      })

      it('loads recaptcha onChange', () => {
        wrapper.find('form').simulate('change')
        expect(wrapper.instance().state.captchaLoaded).toBe(true)
      })

      it('calls the submit callback once', () => {
        expect(onSubmit.mock.calls.length).toBe(1)
      })

      it('calls the submit callback with the right arguments', () => {
        // 'skip' is used for the captcha when captcha verification is disabled
        expect(onSubmit.mock.calls[0]).toEqual([
          'username',
          'email',
          'password',
          'skip'
        ])
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
