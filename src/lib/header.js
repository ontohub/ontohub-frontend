import React from "react";
import styled from "styled-components";

const Header = props => (
  <StyledHeader>
    <InnerHeader
      heightTransitionDuration={props.heightTransitionDuration}
      contentTransitionDuration={props.contentTransitionDuration}
    >
      {props.children}
    </InnerHeader>
  </StyledHeader>
);

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light} !important;
  margin-bottom: 1em;
  margin-top: -100vh;
  padding-top: 100vh;
`;

const InnerHeader = styled.div`
  max-width: ${({ theme }) => theme.sizes.contentWidth};
  margin: auto;
  padding-top: ${({ theme }) => theme.sizes.headerPadding};
`;

export { Header };
