import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Markdown from "react-markdown";
import _githubMarkdownCss from "github-markdown-css/github-markdown.css";

import Lowlight from "react-lowlight";
import _highlightJsCss from "highlight.js/styles/github.css";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

Lowlight.registerLanguage("bash", bash);
Lowlight.registerLanguage("html", xml);
Lowlight.registerLanguage("json", json);
Lowlight.registerLanguage("markdown", markdown);
Lowlight.registerLanguage("xml", xml);
Lowlight.registerLanguage("yaml", yaml);

const CodeBlock = ({ value, language }) => {
  return <Lowlight language={language} value={value} />;
};

export const MarkdownViewer = ({ value }) => (
  // We assume that the value is encoded in plain text
  <Container className="markdown-body">
    <Markdown
      escapeHtml={true}
      source={value}
      renderers={{ code: CodeBlock }}
    />
  </Container>
);
