import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { css, sizes, colors } from '../styles'

const styles = css({
  position: 'fixed',
  backgroundColor: colors.dark,
  width: '100%',
  top: 0,
  display: 'flex',
  justifyContent: 'center'
})

const menuStyles = css({
  height: sizes.menuHeight,
  width: `${sizes.contentWidth}px !important`,
  position: 'relative !important'
})

const GlobalMenu = ({ loading, error, currentUser }) => (
  <div {...styles}>
    <Menu inverted borderless fixed="top" {...menuStyles}>
      <Menu.Item header as={Link} to="/">Ontohub</Menu.Item>
      <Menu.Menu position="right">
        {(currentUser &&
          <Menu.Item>{currentUser.id} ({currentUser.email})</Menu.Item>) ||
          <Menu.Item>Sign in</Menu.Item>}
      </Menu.Menu>
    </Menu>
  </div>
)

export default GlobalMenu
