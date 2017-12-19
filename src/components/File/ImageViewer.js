import React from "react";
import mime from "mime-types";

export default ({ filename, encoding, value }) => {
  const contentType = mime.lookup(filename);
  const imageEncoding = encoding === "base64" ? encoding : "utf8";
  return (
    <img
      style={{ maxWidth: "100%" }}
      src={`data:${contentType};${imageEncoding},${value}`}
      alt={filename}
    />
  );
};
