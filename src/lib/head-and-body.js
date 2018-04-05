import React, { Fragment } from "react";
import { HOC } from "lib/hoc";
import { Header } from "lib/header";

const HeadAndBody = ({ hoc, head: Head, body: Body, ...props }) => (
  <HOC
    hoc={hoc}
    component={props => (
      <Fragment>
        <Header>
          <Head {...props} />
        </Header>
        <Body {...props} />
      </Fragment>
    )}
    {...props}
  />
);

export { HeadAndBody };
