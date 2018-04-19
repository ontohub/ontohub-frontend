import React from "react";
import mime from "mime-types";

export const ImageViewer = ({ filename, encoding, value }) => {
  const contentType = mime.lookup(filename);
  const imageEncoding = encoding === "base64" ? encoding : "utf8";
  return (
    <img
      style={{ padding: "1em", maxWidth: "100%" }}
      src={`data:${contentType};${imageEncoding},${value}`}
      alt={filename}
    />
  );
};
