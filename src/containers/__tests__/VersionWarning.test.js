import React from 'react'
import { VersionWarning } from '..'
import { MockedProvider } from 'react-apollo/lib/test-utils'
import { mount } from 'enzyme'
import { getVersionQuery as query } from '../../apollo/queries'

describe('VersionWarning Container', () => {
  let requirement = '> v0.0.0-65',
      mockedData = {
        version: '0.0.0-83',
        tag: '0.0.0'
      }

  it('calls the API', () => {
    mount(
      <MockedProvider
        mocks={[
          { request: { query, variables: {} }, result: { data: mockedData } }
        ]}
      >
        <VersionWarning requirement={requirement} />
      </MockedProvider>
    )
  })
})
