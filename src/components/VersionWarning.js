import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'
import semver from 'semver'

class VersionWarning extends Component {
  render() {
    const validVersion = semver.satisfies(
      this.props.version,
      this.props.requirement
    )
    return validVersion
      ? null
      : <Message
          negative
          icon="warning sign"
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

VersionWarning.propTypes = {
  version: PropTypes.string.isRequired,
  requirement: PropTypes.string.isRequired
}

export default VersionWarning
