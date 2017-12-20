import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import { fileType } from "../../helpers/filetype";

import ImageViewer from "./ImageViewer";
import PDFViewer from "./PDFViewer";
import Downloader from "./Downloader";
import Editor from "./Editor";

export const File = ({ filename, value, encoding, ...editorProps }) => {
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
      return (
        <Editor
          filename={filename}
          initialValue={value}
          defaultValue={value}
          {...editorProps}
        />
      );
  }
  return null;
};
