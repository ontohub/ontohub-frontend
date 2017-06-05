import React from 'react'
import { Container, Header as SemHeader, List } from 'semantic-ui-react'
import { Header as GenHeader } from '../../../components'
import { Item } from '.'
import { css, sizes } from '../../../styles'

export const Header = () =>
  <GenHeader>
    <Container {...css({ padding: sizes.headerPadding })}>
      <SemHeader as="h2" inverted>Welcome to Ontohub</SemHeader>
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
  </GenHeader>

export default Header
