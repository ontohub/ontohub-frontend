import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { Block } from 'jsxstyle'
import { sizes, colors } from '../styles'

const styles = {
  position: 'fixed',
  backgroundColor: colors.dark,
  width: '100%',
  top: 0,
  display: 'flex',
  justifyContent: 'center'
}

const menuStyles = {
  height: 50,
  width: `${sizes.contentWidth}px !important`,
  position: 'relative !important'
}

const GlobalMenu = () => (
  <Block {...styles}>
    <Menu inverted borderless fixed="top" as={Block} {...menuStyles}>
      <Menu.Item header as={Link} to="/">Ontohub</Menu.Item>
    </Menu>
  </Block>
)

export default GlobalMenu
