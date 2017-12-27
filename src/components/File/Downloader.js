import React, { Fragment } from "react";
import styled from "styled-components";
import mime from "mime-types";
import { Button, Container, Grid } from "semantic-ui-react";
import FileSaver from "file-saver";
import B64toBlob from "b64-to-blob";

const Wrapper = styled.div``;

export const DownloadButton = ({
  filename,
  encoding,
  value,
  ...buttonProps
}) => {
  const contentType = mime.lookup(filename);
  const blob =
    encoding === "base64"
      ? B64toBlob(value, contentType)
      : new Blob([value], {
          type: `${contentType};text/plain;charset=utf-8`
        });
  return (
    <Button
      {...buttonProps}
      onClick={() => {
        FileSaver.saveAs(blob, filename);
      }}
    />
  );
};

export const Downloader = ({ filename, encoding, value }) => {
  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Container>This file type cannot be displayed.</Container>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <DownloadButton
            filename={filename}
            encoding={encoding}
            value={value}
            content={`Download ${filename}`}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
