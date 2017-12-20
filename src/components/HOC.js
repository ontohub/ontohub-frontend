import React from "react";

export const HOC = ({ hoc = o => o, component, ...props }) =>
  React.createElement(hoc(component), props);

export default HOC;
