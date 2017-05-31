import React from 'react'
import { css, colors, sizes } from '../styles'

const headerStyles = css({
  backgroundColor: colors.dark,
  color: `${colors.light} !important`,
  marginBottom: '1em',
  '& > div': {
    maxWidth: sizes.contentWidth,
    margin: 'auto'
  }
})

const Header = (props) => (
  <div {...headerStyles}>
    <div>
      {props.children}
    </div>
  </div>
)

export default Header
