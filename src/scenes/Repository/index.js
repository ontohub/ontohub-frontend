import React from "react";
export { Header } from "./components";

const PureRepository = ({
  match: { params: { organizationalUnitId, repositoryId } }
}) => {
  console.log("Repository");
  console.log(organizationalUnitId);
  console.log(repositoryId);
  return <div>repository</div>;
};

export const Repository = PureRepository;
