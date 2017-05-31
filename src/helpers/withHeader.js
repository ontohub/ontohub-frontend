import React from 'react'

/**
 * @param {ReactElement} Header
 * @param {ReactElement} Component
 * @return {ReactElement}
 */
export const withHeader = (Header, Component) => (props) => (
  <div>
    <Header {...props} />
    <Component {...props} />
  </div>
)

export default withHeader
