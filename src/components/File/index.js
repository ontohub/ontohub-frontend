import React, { Component } from "react";
import _ from "lodash";
import styled, { css } from "styled-components";

import brace from "brace";
import AceEditor from "react-ace";
import "brace/theme/github";

import ImageViewer from "./ImageViewer";
import PDFViewer from "./PDFViewer";
import Downloader from "./Downloader";
import { fileType } from "../../helpers";

export const File = ({ filename, value, encoding }) => {
  switch (fileType(filename)) {
    case "image":
      return (
        <ImageViewer filename={filename} encoding={encoding} value={value} />
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
      return (
        <Downloader filename={filename} encoding={encoding} value={value} />
      );
    case "code":
    // fall through to text
    default:
      // display text
      return;
  }
  return null;
};
