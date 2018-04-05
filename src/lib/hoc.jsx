import React from "react";

const HOC = ({ hoc = o => o, component, ...props }) =>
  React.createElement(hoc(component), props);

export { HOC };
