import React from "react";
import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const PaddedContainer = styled(Container)`
  padding-bottom: ${({ theme }) => theme.sizes.headerPadding};
`;
