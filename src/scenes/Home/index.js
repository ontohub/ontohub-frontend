import React from 'react'
import { withHeader } from '../../helpers'
import { Icon, Message, Container } from 'semantic-ui-react'
import { Header } from './components'

const Home = () =>
  <Container text>
    <Message icon size="tiny" warning>
      <Icon name="announcement" />
      <Message.Content>
        <Message.Header>Development preview</Message.Header>
        You are currently viewing an early development version
        of the new Ontohub website. It does not yet include much
        functionality. To use the stable version of Ontohub,
        please visit
        {' '}
        <a href="https://ontohub.org">ontohub.org</a>
        .
      </Message.Content>
    </Message>
  </Container>

const HomeWithHeader = withHeader(Header, Home)

export { Header, Home }

export default HomeWithHeader
