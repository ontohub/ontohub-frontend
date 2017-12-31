import React from "react";
import { storiesOf } from "@storybook/react";
import theme from "../../../../styles";

import { ThemeProvider } from "styled-components";
import { ReactHeight } from "react-height";
import { withState } from "recompose";
import { Panes } from "../Panes";

const Decorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a ligula
tempor, facilisis nisl vel, semper mauris. Vestibulum tempus risus eu
magna aliquam molestie. Maecenas euismod pretium ultricies. Cras mattis
urna ac justo rhoncus, at tincidunt tellus congue. Ut viverra massa
enim, ac blandit sapien pharetra sed. Phasellus non finibus mi. Nam ac
turpis sollicitudin, gravida ante quis, bibendum tellus. Phasellus vel
tempor dolor. Nulla sed dui et turpis lacinia rhoncus eget a nisi.
Curabitur ut nisi tempus, fringilla ipsum non, pulvinar sapien. Donec
rhoncus, tellus vel tempus faucibus, urna nibh tempor elit, id volutpat
est ligula et sem.`;

const contentL = () => (
  <div style={{ backgroundColor: "PeachPuff", padding: "20px" }}>
    <ul>{_.range(50).map(i => <li key={i}>Test {i}</li>)}</ul>
  </div>
);
const contentC = () => (
  <div style={{ backgroundColor: "LightSteelBlue", padding: "20px" }}>
    {_.range(10).map(i => <p key={i}>Center {lipsum}</p>)}
  </div>
);

const contentR = () => (
  <div style={{ backgroundColor: "LavenderBlush", padding: "20px" }}>
    {_.range(5).map(i => <p key={i}>Right {lipsum}</p>)}
  </div>
);

const contentLWide = () => (
  <div style={{ backgroundColor: "PeachPuff", padding: "20px" }}>
    <div
      style={{ backgroundColor: "DimGrey", width: "115%", height: "50px" }}
    />
    <ul>{_.range(50).map(i => <li key={i}>Test {i}</li>)}</ul>
  </div>
);
const contentCWide = () => (
  <div style={{ backgroundColor: "LightSteelBlue", padding: "20px" }}>
    <div
      style={{ backgroundColor: "DimGrey", width: "115%", height: "50px" }}
    />
    {_.range(10).map(i => <p key={i}>Center {lipsum}</p>)}
  </div>
);

const contentRWide = () => (
  <div style={{ backgroundColor: "LavenderBlush", padding: "20px" }}>
    <div
      style={{ backgroundColor: "DimGrey", width: "115%", height: "50px" }}
    />
    {_.range(5).map(i => <p key={i}>Right {lipsum}</p>)}
  </div>
);

const Header = () => (
  <div
    style={{ width: "100%", height: "100px", backgroundColor: "PaleGreen" }}
  />
);

let height = 0;

const updateHeight = newHeight => {
  height = newHeight;
};

storiesOf("Panes", module)
  .addDecorator(Decorator)
  .add("Every pane opened", () => (
    <div>
      <ReactHeight onHeightReady={updateHeight}>
        <Header />
      </ReactHeight>
      <Panes
        reservedHeaderHeight={height}
        childLeft={contentL}
        childCenter={contentC}
        childRight={contentR}
        leftSegmentIsOpenInitially={true}
        rightSegmentIsOpenInitially={true}
      />
    </div>
  ))
  .add("Left pane closed", () => (
    <div>
      <ReactHeight onHeightReady={updateHeight}>
        <Header />
      </ReactHeight>
      <Panes
        reservedHeaderHeight={height}
        childLeft={contentL}
        childCenter={contentC}
        childRight={contentR}
        leftSegmentIsOpenInitially={false}
        rightSegmentIsOpenInitially={true}
      />
    </div>
  ))
  .add("Right pane closed", () => (
    <div>
      <ReactHeight onHeightReady={updateHeight}>
        <Header />
      </ReactHeight>
      <Panes
        reservedHeaderHeight={height}
        childLeft={contentL}
        childCenter={contentC}
        childRight={contentR}
        leftSegmentIsOpenInitially={true}
        rightSegmentIsOpenInitially={false}
      />
    </div>
  ))
  .add("Left and right pane closed", () => (
    <div>
      <ReactHeight onHeightReady={updateHeight}>
        <Header />
      </ReactHeight>
      <Panes
        reservedHeaderHeight={height}
        childLeft={contentL}
        childCenter={contentC}
        childRight={contentR}
        leftSegmentIsOpenInitially={false}
        rightSegmentIsOpenInitially={false}
      />
    </div>
  ))
  .add("With Side scrolling", () => (
    <div>
      <ReactHeight onHeightReady={updateHeight}>
        <Header />
      </ReactHeight>
      <Panes
        reservedHeaderHeight={height}
        childLeft={contentLWide}
        childCenter={contentCWide}
        childRight={contentRWide}
      />
    </div>
  ));
