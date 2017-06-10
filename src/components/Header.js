import React from 'react'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light} !important;
  margin-bottom: 1em;
`

const InnerHeader = styled.div`
  max-width: ${({ theme }) => theme.sizes.contentWidth};
  margin: auto;
`

export const PaddedContainer = styled(Container)`
  padding: ${({ theme }) => theme.sizes.headerPadding}
`

export const Header = (props) =>
  <StyledHeader>
    <InnerHeader>
      {props.children}
    </InnerHeader>
  </StyledHeader>

export default Header
