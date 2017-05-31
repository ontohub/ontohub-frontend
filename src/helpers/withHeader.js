import React from 'react'

export const withHeader = (Header, Component) => (props) => (
  <div>
    <Header {...props} />
    <Component {...props} />
  </div>
)

export default withHeader
