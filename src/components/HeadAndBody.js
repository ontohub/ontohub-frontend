import React, { Fragment } from "react";
import { Header } from ".";

export const HeadAndBody = ({ hoc = o => o, ...props }) => {
  const Comp = hoc(({ head: Head, body: Body, ...props }) => (
    <Fragment>
      <Header>
        <Head {...props} />
      </Header>
      <Body {...props} />
    </Fragment>
  ));
  return <Comp {...props} />;
};

export default HeadAndBody;
