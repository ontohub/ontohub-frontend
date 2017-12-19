import React from "react";
import styled, { css } from "styled-components";
import { compose, defaultProps, withProps, withStateHandlers } from "recompose";
import { Button, Icon, Label } from "semantic-ui-react";
import PDF from "react-pdf-js";

const RawPagination = ({
  className,
  page,
  pagesCount,
  handlePrevious,
  handleNext
}) => {
  return (
    <Button.Group className={className}>
      <Button
        onClick={handlePrevious}
        disabled={page === 1}
        icon
        labelPosition="left"
      >
        <Icon name="angle double left" />
        Previous Page
      </Button>
      <Button.Or text={`${page}/${pagesCount}`} />
      <Button
        onClick={handleNext}
        disabled={page === pagesCount}
        icon
        labelPosition="right"
      >
        Next Page
        <Icon name="angle double right" />
      </Button>
    </Button.Group>
  );
};
const Pagination = styled(RawPagination)`
  text-align: center;
  width: 100%;
`;

const Viewer = ({
  page,
  pagesCount,
  handlePrevious,
  handleNext,
  onDocumentComplete,
  onPageComplete,
  ...pdfProps
}) => (
  <div>
    <Pagination
      page={page}
      pagesCount={pagesCount}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
    />
    <PDF
      onDocumentComplete={onDocumentComplete}
      onPageComplete={onPageComplete}
      page={page}
      {...pdfProps}
    />
  </div>
);

export default compose(
  defaultProps({ fillWidth: true, fillHeight: true }),
  withStateHandlers(
    ({ initialPage = 1, initialPagesCount = 1 }) => ({
      page: initialPage,
      pagesCount: initialPagesCount
    }),
    {
      onDocumentComplete: () => pagesCount => ({
        page: 1,
        pagesCount: pagesCount
      }),
      onPageComplete: () => page => ({
        page: page
      }),
      handlePrevious: ({ page }) => () => ({
        page: page - 1
      }),
      handleNext: ({ page }) => () => ({
        page: page + 1
      })
    }
  )
)(Viewer);
