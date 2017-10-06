import React from 'react'
import { Header as SemHeader, List } from 'semantic-ui-react'
import { PaddedContainer } from '../../../components'
import { Item } from '.'

export const Header = () => (
  <PaddedContainer>
    <SemHeader as="h2" inverted>
      To Ontohub welcome you are
    </SemHeader>
  </PaddedContainer>
)

export default Header
