import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { LoginModal } from './LoginModal'
import { css, sizes, colors } from '../styles'
import Gravatar from 'react-gravatar'

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

const SignedInMenu = ({ me, onSignOut }) =>
  <Menu.Menu position="right">
    <Dropdown item trigger={<span><Icon name="plus" /></span>}>
      <Dropdown.Menu>
        <Dropdown.Header>
          Create new...
        </Dropdown.Header>
        <Dropdown.Item as={Link} to="/new" content="Repository" />
        <Dropdown.Item
          as={Link}
          to="/organizations/new"
          content="Organization"
        />
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown
      item
      trigger={
        <span>
          <Gravatar style={{ borderRadius: 2 }} size={24} md5={me.emailHash} />
        </span>
      }
    >
      <Dropdown.Menu>
        <Dropdown.Header>
          Signed in as {me.id}
        </Dropdown.Header>
        <Dropdown.Item as={Link} to={`/${me.id}`} content="Profile" />
        <Dropdown.Divider />
        <Dropdown.Item onClick={onSignOut} content="Sign out" />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>

const SignedOutMenu = ({ onSignIn, signUpValidations }) =>
  <Menu.Menu position="right">
    <Menu.Item>
      <LoginModal onSignIn={onSignIn} signUpValidations={signUpValidations} />
    </Menu.Item>
  </Menu.Menu>

const GlobalMenu = ({
  loading,
  error,
  me,
  onSignIn,
  onSignOut,
  signUpValidations
}) =>
  <div {...styles}>
    <Menu inverted borderless fixed="top" {...menuStyles}>
      <Menu.Item header as={Link} to="/">Ontohub</Menu.Item>
      {(me && <SignedInMenu me={me} onSignOut={onSignOut} />) ||
        <SignedOutMenu
          onSignIn={onSignIn}
          signUpValidations={signUpValidations}
        />}
    </Menu>
  </div>

export default GlobalMenu
