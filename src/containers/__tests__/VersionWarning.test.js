import React from 'react'
import { VersionWarning } from '..'
import { ApolloProvider } from 'react-apollo'
import { client } from '../../apollo'
import { mount } from 'enzyme'

describe('VersionWarning Container', () => {
  let requirement = '> v0.0.0-65'

  it('calls the API', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json() {
          return Promise.resolve({
            data: {
              attributes: {
                tag: '0.0.0',
                commits_since_tag: 80
              }
            }
          })
        }
      })
    )
    mount(
      <ApolloProvider client={client}>
        <VersionWarning requirement={requirement} />
      </ApolloProvider>
    )
    expect(global.fetch.mock.calls.length).toBe(1)
  })
})
