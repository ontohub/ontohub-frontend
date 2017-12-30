import React, { Fragment } from "react";
import _, { includes } from "lodash";
import styled from "styled-components";
import { ReactHeight } from "react-height";
import { compose, defaultProps, withStateHandlers } from "recompose";
import { Button, Header, Icon, Menu, Popup, Segment } from "semantic-ui-react";

import { media } from "../../helpers";
import { fileType } from "../../helpers/filetype";

import { ImageViewer } from "./ImageViewer";
import { PDFViewer } from "./PDFViewer";
import { Downloader, DownloadButton } from "./Downloader";
import { Editor } from "./Editor";

export const FileSwitch = ({ filename, value, encoding, ...editorProps }) => {
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
    case "text":
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

const OnMobile = styled.div`
  ${media.mobileOnly`display: inherit;`};
  ${media.tablet`display: none;`};
`;
const OnTabletAndUp = styled.div`
  ${media.mobileOnly`display: none;`};
  ${media.tablet`display: inherit;`};
`;

const ControlButton = ({ name, label, ...buttonProps }) => (
  <Menu.Item name={name}>
    <OnMobile>
      <Popup
        trigger={<Button {...buttonProps} />}
        content={label}
        position="bottom right"
      />
    </OnMobile>
    <OnTabletAndUp>
      <Button label={label} {...buttonProps} />
    </OnTabletAndUp>
  </Menu.Item>
);

const ControlsRaw = ({ onClick, display }) => {
  if (display) {
    return (
      <ControlButton
        name="raw"
        icon="file outline"
        label="Raw File"
        onClick={onClick}
      />
    );
  } else {
    return null;
  }
};

const ControlsRemove = ({ onClick, display }) => {
  if (display) {
    return (
      <ControlButton
        name="delete"
        icon="trash"
        label="Delete File"
        onClick={onClick}
        negative
      />
    );
  } else {
    return null;
  }
};

const ControlsDownload = ({ filename, encoding, value }) => (
  <Menu.Item name={name}>
    <OnMobile>
      <Popup
        trigger={
          <DownloadButton
            icon="download"
            filename={filename}
            encoding={encoding}
            value={value}
          />
        }
        content="Download"
        position="bottom right"
      />
    </OnMobile>
    <OnTabletAndUp>
      <DownloadButton
        icon="download"
        label="Download"
        filename={filename}
        encoding={encoding}
        value={value}
      />
    </OnTabletAndUp>
  </Menu.Item>
);

const Controls = ({
  allowRaw,
  allowDelete,
  onRaw,
  onDelete,
  className,
  filename,
  encoding,
  value
}) => (
  <div className={className}>
    <Menu inverted borderless fluid>
      <Menu.Item header>{filename}</Menu.Item>
      <Menu.Menu position="right">
        <ControlsRaw onClick={onRaw} display={allowRaw} />
        <ControlsDownload
          filename={filename}
          encoding={encoding}
          value={value}
        />
        <ControlsRemove onClick={onDelete} display={allowDelete} />
      </Menu.Menu>
    </Menu>
  </div>
);

export const PureFile = ({
  isEditingPermitted,
  updateHeight,
  onRaw,
  onDelete,

  controlsHeight,
  reservedHeight,

  filename,
  value,
  encoding,

  ...editorProps
}) => {
  return (
    <Fragment>
      <ReactHeight onHeightReady={updateHeight}>
        <Controls
          allowRaw={includes(
            ["text", "code", "image", null],
            fileType(filename)
          )}
          allowDelete={isEditingPermitted}
          onRaw={onRaw}
          onDelete={onDelete}
          filename={filename}
          encoding={encoding}
          value={value}
        />
      </ReactHeight>
      <FileSwitch
        filename={filename}
        value={value}
        encoding={encoding}
        reservedHeaderHeight={controlsHeight + reservedHeight}
        isEditingPermitted={isEditingPermitted}
        {...editorProps}
      />
    </Fragment>
  );
};

export const File = compose(
  defaultProps({ reservedHeight: 0 }),
  withStateHandlers(
    ({ initialControlsHeight = 0 }) => ({
      controlsHeight: initialControlsHeight
    }),
    {
      updateHeight: () => newHeight => ({ controlsHeight: newHeight })
    }
  )
)(PureFile);
