import React, { Component } from "react";
import _ from "lodash";
import styled, { css } from "styled-components";
import { compose, defaultProps, withProps, withStateHandlers } from "recompose";
import { Accordion, Button, Icon, Transition } from "semantic-ui-react";
import { media } from "../../../helpers";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  height: 100vh;
  margin-top: -${({ reservedHeaderHeight }) => reservedHeaderHeight}px;
  padding-top: ${({ reservedHeaderHeight }) => reservedHeaderHeight}px;
  position: relative;
  width: 100%;
  will-change: overflow;
  & ::-webkit-scrollbar {
    width: 0.3em;
  }
`;

const OnMobile = styled(Container)`
  ${media.mobileOnly`display: flex;`};
  ${media.tablet`display: none;`};
`;
const OnTablet = styled(Container)`
  ${media.mobileOnly`display: none;`};
  ${media.tabletOnly`display: flex;`};
  ${media.computer`display: none;`};
`;
const OnComputerAndUp = styled(Container)`
  ${media.mobileOnly`display: none;`};
  ${media.tabletOnly`display: none;`};
  ${media.computer`display: flex;`};
`;

const SegmentToggler = ({
  attachedAt,
  isOpen,
  toggle,
  iconOpen,
  iconClosed,
  label,
  vertical
}) => (
  <Button
    active={isOpen}
    basic
    attached={attachedAt}
    size="mini"
    onClick={toggle}
    style={{ padding: "2px 0", boxSizing: "border-box" }}
  >
    <div style={{ position: "relative" }}>
      <Icon name={isOpen ? iconOpen : iconClosed} />
      {label &&
        (vertical ? (
          <div
            style={{
              writingMode: "vertical-lr",
              padding: "2px",
              marginTop: "1ex"
            }}
          >
            {label}
          </div>
        ) : (
          <span style={{ padding: "2px" }}>{label}</span>
        ))}
    </div>
  </Button>
);

const ScrollingAccordion = styled(Accordion)`
  box-sizing: border-box;
  overflow: auto;
  height: auto;
`;

const TabletAndUpSegmentLeft = styled.div`
  box-sizing: border-box;
  overflow: auto;
  height: auto;
  will-change: width;
  transition: width ${({ transitionDuration }) => transitionDuration}ms
    ease-in-out;
`;

const ComputerAndUpSegmentCenter = styled.div`
  box-sizing: border-box;
  overflow: auto;
  height: auto;
  flex: 1;
  will-change: left, right;
`;

const ComputerAndUpSegmentRight = styled.div`
  box-sizing: border-box;
  overflow: auto;
  height: auto;
  will-change: width;
  transition: width ${({ transitionDuration }) => transitionDuration}ms
    ease-in-out;
`;

const TabletSegmentsCenterAndRight = styled.div`
  box-sizing: border-box;
  height: 100%;
  flex: 1;
  will-change: left;
`;

const TabletSegmentCenter = styled.div`
  box-sizing: border-box;
  overflow: auto;
  flex: 1;
  will-change: left, height;
  transition: height ${({ transitionDuration }) => transitionDuration}ms
    ease-in-out;
`;

const TabletSegmentRight = styled.div`
  box-sizing: border-box;
  overflow: auto;
  will-change: left, height;
  transition: height ${({ transitionDuration }) => transitionDuration}ms
    ease-in-out;
  flex: 1;
`;

const StaticRepositoryPanes = ({
  // Child components to display in the segments
  childLeft,
  childCenter,
  childRight,

  // Titles of these components (for mobile view)
  labelLeft,
  labelCenter,
  labelRight,

  // Options
  transitionDuration, // in ms
  reservedHeaderHeight, // in px
  tabletAndUpLeftSegmentWidth, // in px
  computerAndUpRightSegmentWidth, // in px
  tabletRightSegmentTabletHeight, // in px

  leftSegmentIsOpen,
  rightSegmentIsOpen,

  toggleLeftSegment,
  toggleRightSegment,

  mobileActiveSegment,
  mobileSwitchSegment,

  // Props that cannot be overwritten
  segmentLeft,
  segmentCenter,
  segmentRight,
  segmentsCenterRightTablet,
  segmentCenterTablet,
  segmentRightTablet
}) => {
  // Scrollable column layout adapted from
  // https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css
  const ChildLeft = childLeft;
  const ChildCenter = childCenter;
  const ChildRight = childRight;

  const Left = segmentLeft;
  const Center = segmentCenter;
  const Right = segmentRight;
  const CenterRightTablet = segmentsCenterRightTablet;
  const CenterTablet = segmentCenterTablet;
  const RightTablet = segmentRightTablet;

  const leftSegmentWidthEM = leftSegmentIsOpen
    ? tabletAndUpLeftSegmentWidth / 16.0
    : 0; //em
  const rightSegmentWidthEM = rightSegmentIsOpen
    ? computerAndUpRightSegmentWidth / 16.0
    : 0; //em
  const rightSegmentTabletHeightEM = rightSegmentIsOpen
    ? tabletRightSegmentTabletHeight / 16.0
    : 0; // em

  return (
    <Container reservedHeaderHeight={reservedHeaderHeight}>
      <OnMobile reservedHeaderHeight={reservedHeaderHeight}>
        <ScrollingAccordion fluid styled>
          <Accordion.Title
            active={mobileActiveSegment === "left"}
            segment="left"
            handlerid="mobileLeftSegmentSwitcher"
            onClick={(event, { segment }) => mobileSwitchSegment(segment)}
          >
            <Icon name="dropdown" />
            {labelLeft}
          </Accordion.Title>
          <Accordion.Content active={mobileActiveSegment === "left"}>
            <Transition
              visible={mobileActiveSegment === "left"}
              animation="slide up"
              duration={transitionDuration}
            >
              <ChildLeft />
            </Transition>
          </Accordion.Content>
          <Accordion.Title
            active={mobileActiveSegment === "center"}
            segment="center"
            handlerid="mobileCenterSegmentSwitcher"
            onClick={(event, { segment }) => mobileSwitchSegment(segment)}
          >
            <Icon name="dropdown" />
            {labelCenter}
          </Accordion.Title>
          <Accordion.Content active={mobileActiveSegment === "center"}>
            <Transition
              visible={mobileActiveSegment === "center"}
              animation="slide up"
              duration={transitionDuration}
            >
              <ChildCenter />
            </Transition>
          </Accordion.Content>
          <Accordion.Title
            active={mobileActiveSegment === "right"}
            segment="right"
            handlerid="mobileRightSegmentSwitcher"
            onClick={(event, { segment }) => mobileSwitchSegment(segment)}
          >
            <Icon name="dropdown" />
            {labelRight}
          </Accordion.Title>
          <Accordion.Content active={mobileActiveSegment === "right"}>
            <Transition
              visible={mobileActiveSegment === "right"}
              animation="slide up"
              duration={transitionDuration}
            >
              <ChildRight />
            </Transition>
          </Accordion.Content>
        </ScrollingAccordion>
      </OnMobile>
      <OnTablet reservedHeaderHeight={reservedHeaderHeight}>
        <Left
          transitionDuration={transitionDuration}
          style={{ width: `${leftSegmentWidthEM}em` }}
        >
          <ChildLeft />
        </Left>
        <SegmentToggler
          handlerid="tabletLeftSegmentToggler"
          isOpen={leftSegmentIsOpen}
          toggle={toggleLeftSegment}
          attachedAt="right"
          iconOpen={"chevron left"}
          iconClosed={"chevron right"}
          label={labelLeft}
          vertical
        />
        <CenterRightTablet
          style={{
            left: `${leftSegmentWidthEM}em`
          }}
        >
          <RightTablet
            leftSegmentWidthEM={leftSegmentWidthEM}
            rightSegmentIsOpen={rightSegmentIsOpen}
            transitionDuration={transitionDuration}
            style={{
              left: `${leftSegmentWidthEM}em`,
              height: `${rightSegmentTabletHeightEM}em`
            }}
          >
            <ChildRight />
          </RightTablet>
          <SegmentToggler
            handlerid="tabletRightSegmentToggler"
            isOpen={rightSegmentIsOpen}
            toggle={toggleRightSegment}
            attachedAt="bottom"
            iconOpen={"chevron up"}
            iconClosed={"chevron down"}
            label={labelRight}
          />
          <CenterTablet
            leftSegmentWidthEM={leftSegmentWidthEM}
            transitionDuration={transitionDuration}
            style={{
              left: `${leftSegmentWidthEM}em`,
              height: `calc(100% - ${rightSegmentTabletHeightEM}em)`
            }}
          >
            <ChildCenter />
          </CenterTablet>
        </CenterRightTablet>
      </OnTablet>
      <OnComputerAndUp reservedHeaderHeight={reservedHeaderHeight}>
        <Left
          transitionDuration={transitionDuration}
          style={{ width: `${leftSegmentWidthEM}em` }}
        >
          <ChildLeft />
        </Left>
        <SegmentToggler
          handlerid="computerAndUpLeftSegmentToggler"
          isOpen={leftSegmentIsOpen}
          toggle={toggleLeftSegment}
          attachedAt="right"
          iconOpen={"chevron left"}
          iconClosed={"chevron right"}
          label={labelLeft}
          vertical
        />
        <Center
          style={{
            left: `${leftSegmentWidthEM}em`,
            right: `${rightSegmentWidthEM}em`
          }}
          leftSegmentWidthEM={leftSegmentWidthEM}
          rightSegmentWidthEM={rightSegmentWidthEM}
        >
          <ChildCenter />
        </Center>
        <SegmentToggler
          handlerid="computerAndUpRightSegmentToggler"
          isOpen={rightSegmentIsOpen}
          toggle={toggleRightSegment}
          attachedAt="left"
          iconOpen={"chevron right"}
          iconClosed={"chevron left"}
          label={labelRight}
          vertical
        />
        <Right
          style={{ width: `${rightSegmentWidthEM}em` }}
          transitionDuration={transitionDuration}
        >
          <ChildRight />
        </Right>
      </OnComputerAndUp>
    </Container>
  );
};

export const RepositoryPanes = compose(
  defaultProps({
    labelLeft: "Left",
    labelCenter: "Center",
    labelRight: "Right",

    transitionDuration: 400,
    tabletAndUpLeftSegmentWidth: 250,
    computerAndUpRightSegmentWidth: 350,
    tabletRightSegmentTabletHeight: 250,

    leftSegmentIsOpen: true,
    rightSegmentIsOpen: true,

    mobileActiveSegment: "left"
  }),
  withProps({
    segmentLeft: TabletAndUpSegmentLeft,
    segmentCenter: ComputerAndUpSegmentCenter,
    segmentRight: ComputerAndUpSegmentRight,
    segmentsCenterRightTablet: TabletSegmentsCenterAndRight,
    segmentCenterTablet: TabletSegmentCenter,
    segmentRightTablet: TabletSegmentRight
  }),
  withStateHandlers(
    ({
      leftSegmentIsOpenInitially = true,
      rightSegmentIsOpenInitially = false,
      mobileActiveSegmentInitially = "left"
    }) => ({
      leftSegmentIsOpen: leftSegmentIsOpenInitially,
      rightSegmentIsOpen: rightSegmentIsOpenInitially,
      mobileActiveSegment: mobileActiveSegmentInitially
    }),
    {
      toggleLeftSegment: ({ leftSegmentIsOpen }) => () => ({
        leftSegmentIsOpen: !leftSegmentIsOpen
      }),
      toggleRightSegment: ({ rightSegmentIsOpen }) => () => ({
        rightSegmentIsOpen: !rightSegmentIsOpen
      }),
      mobileSwitchSegment: ({ mobileActiveSegment }) => segment => ({
        mobileActiveSegment:
          mobileActiveSegment === segment ? undefined : segment
      })
    }
  )
)(StaticRepositoryPanes);
