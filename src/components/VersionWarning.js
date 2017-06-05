// @flow

import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import { css } from '../styles'
import { satisfies } from 'semver'

const messageStyles = css({
  position: 'fixed !important',
  margin: '-1px !important',
  borderRadius: '0 !important',
  bottom: 0,
  width: 'calc(100% + 2px) !important'
})

const WarningMessage = (props: {}) => (
  <Message {...messageStyles} negative icon="warning sign" {...props} />
)

export { WarningMessage }

export class VersionWarning extends Component {
  props: {
    version: string,
    loading?: boolean,
    requirement: string
  }
  static defaultProps = {
    version: ''
  }
  render() {
    if (this.props.error) {
      return (
        <WarningMessage
          header="Could not determine backend version"
          content="This could mean that the backend is currently offline"
        />
      )
    }
    const validVersion =
      this.props.loading ||
      satisfies(this.props.version, this.props.requirement)

    return validVersion
      ? null
      : <WarningMessage
          header="The connected backend does not meet the version requirement"
          content={
            <p>
              Expected version
              {' '}
              <code>{this.props.version}</code>
              {' '}
              to satisfy requirement
              {' '}
              <code>{this.props.requirement}</code>
              . Be aware that this may cause problems.
            </p>
          }
        />
  }
}

export default VersionWarning
