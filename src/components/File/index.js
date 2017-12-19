import React, { Component } from "react";
import _ from "lodash";
import styled, { css } from "styled-components";
import { compose, defaultProps, withProps, withStateHandlers } from "recompose";
import { Accordion, Button, Icon, Transition } from "semantic-ui-react";
import mime from "mime-types";

import brace from "brace";
import AceEditor from "react-ace";
import "brace/theme/github";

import PDFViewer from "./PDFViewer";
import { fileType } from "../../helpers";

export const File = ({ filename, value, encoding }) => {
  switch (fileType(filename)) {
    case "image":
      const contentType = mime.lookup(filename);
      const imageEncoding = encoding === "base64" ? encoding : "utf8";
      return (
        <img
          style={{ maxWidth: "100%" }}
          src={`data:${contentType};${imageEncoding},${value}`}
          alt={filename}
        />
      );
    case "pdf":
      return <PDFViewer content={value} />;
      break;
    case "audio":
    case "video":
    case "word":
    case "excel":
    case "powerpoint":
    case "archive":
      // download
      break;
    case "code":
    // fall through to text
    default:
      // display text
      return;
  }
  return null;
};
