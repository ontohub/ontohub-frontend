import React from 'react'
import { Container } from 'semantic-ui-react'
import { colors, sizes } from '../styles'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: ${colors.dark};
  color: ${colors.light} !important;
  margin-bottom: 1em;
`

const InnerHeader = styled.div`
  max-width: ${sizes.contentWidth};
  margin: auto;
`

export const PaddedContainer = styled(Container)`
  padding: ${sizes.headerPadding}
`

export const Header = (props) =>
  <StyledHeader>
    <InnerHeader>
      {props.children}
    </InnerHeader>
  </StyledHeader>

export default Header
