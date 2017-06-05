import React from 'react'
import { css } from 'glamor'

export const Bold = (props) =>
  <span {...css({ fontWeight: 'bold' })}>
    {props.children}
  </span>

export default Bold
