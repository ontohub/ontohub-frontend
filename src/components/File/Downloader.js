import React from "react";
import mime from "mime-types";
import { Button } from "semantic-ui-react";
import FileSaver from "file-saver";
import B64toBlob from "b64-to-blob";

export default ({ filename, encoding, value }) => {
  const contentType = mime.lookup(filename);
  const blob =
    encoding === "base64"
      ? B64toBlob(value, contentType)
      : new Blob([value], {
          type: `${contentType};text/plain;charset=utf-8`
        });
  return (
    <Button
      onClick={() => {
        FileSaver.saveAs(blob, filename);
      }}
    >
      Download {filename}
    </Button>
  );
};
