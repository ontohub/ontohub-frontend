import React from 'react'
import { Block } from 'jsxstyle'
import { colors, sizes } from '../styles'

const Header = (props) => (
  <Block
    backgroundColor={colors.dark}
    color={`${colors.light} !important`}
    marginBottom="1em"
  >
    <Block maxWidth={sizes.contentWidth} margin="auto">
      {props.children}
    </Block>
  </Block>
)

export default Header
