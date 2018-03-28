import React from "react";
import styled from "styled-components";
import { compose, defaultProps, withStateHandlers } from "recompose";
import { Button, Icon, Input, Label } from "semantic-ui-react";
import PDF from "react-pdf-js";

const UnstyledPagination = ({
  className,
  page,
  pageInInput,
  pagesCount,
  handlePrevious,
  handleNext,
  changePageInInputTo,
  changePageTo
}) => {
  return (
    <div className={`row ${className}`}>
      <Button
        onClick={handlePrevious}
        disabled={page === 1}
        icon
        labelPosition="left"
      >
        <Icon name="angle double left" />
        Previous Page
      </Button>
      <form
        onSubmit={event => {
          event.preventDefault();
          changePageTo(pageInInput);
        }}
      >
        <Input labelPosition="right" type="text" placeholder="Page">
          <input
            style={{ textAlign: "right" }}
            value={pageInInput}
            onChange={event => {
              changePageInInputTo(event.target.value);
            }}
          />
          <Label>of {pagesCount}</Label>
        </Input>
      </form>
      <Button
        onClick={handleNext}
        disabled={page === pagesCount}
        icon
        labelPosition="right"
      >
        Next Page
        <Icon name="angle double right" />
      </Button>
    </div>
  );
};
const Pagination = styled(UnstyledPagination)`
  text-align: center;
  width: 100%;
  & form {
    display: inline-block;
    margin: 0 0.25em 0 0;
    padding: 0.125em 0 0 0;
  }
  & form input {
    width: 4em;
    height: 36px;
  }
  & form .label {
    width: 4em;
    height: 36px;
    text-align: left;
  }
`;

const PurePDFViewer = ({
  page,
  pagesCount,
  pageInInput,
  handlePrevious,
  handleNext,
  changePageInInputTo,
  changePageTo,
  onDocumentComplete,
  onPageComplete,
  ...pdfProps
}) => (
  <div>
    <Pagination
      page={page}
      pageInInput={pageInInput}
      pagesCount={pagesCount}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      changePageTo={changePageTo}
      changePageInInputTo={changePageInInputTo}
    />
    <PDF
      onDocumentComplete={onDocumentComplete}
      onPageComplete={onPageComplete}
      page={page}
      {...pdfProps}
    />
  </div>
);

export const PDFViewer = compose(
  defaultProps({ fillWidth: true, fillHeight: true }),
  withStateHandlers(
    ({ initialPage = 1, initialPagesCount = 1 }) => ({
      page: initialPage,
      pagesCount: initialPagesCount,
      pageInInput: initialPage
    }),
    {
      onDocumentComplete: () => pagesCount => ({
        page: 1,
        pagesCount: pagesCount
      }),
      onPageComplete: () => page => ({
        page: page,
        pageInInput: page
      }),
      handlePrevious: ({ page }) => () => ({
        page: page - 1
      }),
      handleNext: ({ page }) => () => ({
        page: page + 1
      }),
      changePageInInputTo: () => newPage => ({
        pageInInput: newPage
      }),
      changePageTo: ({ pagesCount }) => newPage => {
        const pageInt = parseInt(newPage, 10);
        if (pageInt && 1 <= pageInt && pageInt <= pagesCount) {
          return { page: pageInt };
        }
      }
    }
  )
)(PurePDFViewer);
