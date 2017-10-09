import React from 'react'
import { Icon, Message, Container } from 'semantic-ui-react'
import { Header } from './components'

const OrganizationalUnit = props => (
  <Container text>World Hello, {JSON.stringify(props)}</Container>
)

export { Header, OrganizationalUnit }

export default OrganizationalUnit
