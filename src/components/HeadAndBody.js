import React, { Fragment } from "react";
import { HOC } from "./HOC";
import { Header } from ".";

export const HeadAndBody = ({ hoc, head: Head, body: Body, ...props }) => (
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

export default HeadAndBody;
