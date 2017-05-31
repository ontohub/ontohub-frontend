import React from 'react'
import { withHeader } from '../helpers'
import Header from './Header'
import { Icon, List, Header as H, Message, Container } from 'semantic-ui-react'
import { css, sizes } from '../styles'

const Bold = (props) => (
  <span {...css({ fontWeight: 'bold' })}>
    {props.children}
  </span>
)

const Item = ({ icon, header, content }) => (
  <List.Item>
    <List.Icon name={icon} />
    <List.Content>
      <Bold>{header}</Bold>{' — '}{content}
    </List.Content>
  </List.Item>
)

const HomeHeader = () => (
  <Header>
    <Container {...css({ padding: sizes.headerPadding })}>
      <H as="h2" inverted>Welcome to Ontohub</H>
      <List size="large">
        <Item
          icon="fork"
          header="Open"
          content="based on open source software"
        />
        <Item
          icon="code"
          header="Flexible"
          content="supporting OWL, UML, FOL/TPTP, HOL/THF, and more"
        />
        <Item
          icon="sitemap"
          header="Distributed"
          content="OMS alignments, mappings, networks, combinations using DOL"
        />
      </List>
    </Container>
  </Header>
)

const Home = () => (
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
)

const HomeWithHeader = withHeader(HomeHeader, Home)

export { HomeHeader, Home }

export default HomeWithHeader
