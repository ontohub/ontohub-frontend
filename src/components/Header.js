import React from "react";
import { Container } from "semantic-ui-react";
import styled from "react-emotion";

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light} !important;
  margin-bottom: 1em;
`;

const InnerHeader = styled.div`
  max-width: ${({ theme }) => theme.sizes.contentWidth};
  margin: auto;
  padding-top: ${({ theme }) => theme.sizes.headerPadding};

  & .cross-fade-leave {
    opacity: 1;
  }
  & .cross-fade-leave.cross-fade-leave-active {
    opacity: 0;
    transition: opacity
      ${({ contentTransitionDuration }) => contentTransitionDuration} ease-in;
  }

  & .cross-fade-enter {
    opacity: 0;
  }
  & .cross-fade-enter.cross-fade-enter-active {
    opacity: 1;
    transition: opacity
      ${({ contentTransitionDuration }) => contentTransitionDuration} ease-in
      ${({ heightTransitionDuration }) => heightTransitionDuration};
  }

  & .cross-fade-height {
    transition: height
      ${({ heightTransitionDuration }) => heightTransitionDuration} ease-in-out;
  }
`;

export const PaddedContainer = styled(Container)`
  padding-bottom: 1em;
`;

export const Header = props => (
  <StyledHeader>
    <InnerHeader
      heightTransitionDuration={props.heightTransitionDuration}
      contentTransitionDuration={props.contentTransitionDuration}
    >
      {props.children}
    </InnerHeader>
  </StyledHeader>
);

export default Header;
