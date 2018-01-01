import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Markdown from "react-markdown";
import _githubMarkdownCss from "github-markdown-css/github-markdown.css";

export const MarkdownViewer = ({ value }) => (
  // We assume that the value is encoded in plain text
  <Container className="markdown-body">
    <Markdown escapeHtml={true} source={value} />
  </Container>
);
