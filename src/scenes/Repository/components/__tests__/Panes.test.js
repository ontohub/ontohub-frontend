import React from "react";
import { mount, render } from "enzyme";
import { Panes } from "../Panes";

describe("Panes", () => {
  const ChildLeft = () => null;
  const ChildCenter = () => null;
  const ChildRight = () => null;
  const reservedHeaderHeight = 10;

  describe("with default options", () => {
    const component = (
      <Panes
        reservedHeaderHeight={reservedHeaderHeight}
        childLeft={ChildLeft}
        childCenter={ChildCenter}
        childRight={ChildRight}
      />
    );

    it("matches the snapshot", () => {
      const wrapper = mount(component);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("mobile view", () => {
    describe("starting at the left segment", () => {
      const mobileActiveSegment = "left";
      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          mobileActiveSegmentInitially={mobileActiveSegment}
        />
      );

      it("the correct segment is open (snapshot)", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("starting at the center segment", () => {
      const mobileActiveSegment = "center";
      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          mobileActiveSegmentInitially={mobileActiveSegment}
        />
      );

      it("the correct segment is open (snapshot)", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("starting at the right segment", () => {
      const mobileActiveSegment = "right";
      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          mobileActiveSegmentInitially={mobileActiveSegment}
        />
      );

      it("the correct segment is open (snapshot)", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("with left segment closed", () => {
    const leftSegmentIsOpen = false;
    describe("with right segment closed", () => {
      const rightSegmentIsOpen = false;

      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          leftSegmentIsOpen={leftSegmentIsOpen}
          rightSegmentIsOpen={rightSegmentIsOpen}
        />
      );

      it("matches the snapshot", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("with right segment open", () => {
      const rightSegmentIsOpen = true;

      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          leftSegmentIsOpen={leftSegmentIsOpen}
          rightSegmentIsOpen={rightSegmentIsOpen}
        />
      );

      it("matches the snapshot", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("with left segment open", () => {
    const leftSegmentIsOpen = true;
    describe("with right segment closed", () => {
      const rightSegmentIsOpen = false;

      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          leftSegmentIsOpen={leftSegmentIsOpen}
          rightSegmentIsOpen={rightSegmentIsOpen}
        />
      );

      it("matches the snapshot", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("with right segment open", () => {
      const rightSegmentIsOpen = true;

      const component = (
        <Panes
          reservedHeaderHeight={reservedHeaderHeight}
          childLeft={ChildLeft}
          childCenter={ChildCenter}
          childRight={ChildRight}
          leftSegmentIsOpen={leftSegmentIsOpen}
          rightSegmentIsOpen={rightSegmentIsOpen}
        />
      );

      it("matches the snapshot", () => {
        const wrapper = mount(component);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("interactions", () => {
    const component = (
      <Panes
        reservedHeaderHeight={reservedHeaderHeight}
        childLeft={ChildLeft}
        childCenter={ChildCenter}
        childRight={ChildRight}
        leftSegmentIsOpen={true}
        rightSegmentIsOpen={true}
      />
    );

    describe("after toggling the left segment in the computer view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "computerAndUpRightSegmentToggler" })
        .simulate("click");

      it("toggles the left segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the left segment in the computer view", () => {
        wrapper
          .find({ handlerid: "computerAndUpRightSegmentToggler" })
          .simulate("click");

        it("toggles the left segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the right segment in the computer view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "computerAndUpRightSegmentToggler" })
        .simulate("click");

      it("toggles the right segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the right segment in the computer view", () => {
        wrapper
          .find({ handlerid: "computerAndUpRightSegmentToggler" })
          .simulate("click");

        it("toggles the right segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the left segment in the tablet view", () => {
      const wrapper = mount(component);
      wrapper.find({ handlerid: "tabletLeftSegmentToggler" }).simulate("click");

      it("toggles the left segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the left segment in the tablet view", () => {
        wrapper
          .find({ handlerid: "tabletLeftSegmentToggler" })
          .simulate("click");

        it("toggles the left segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the right segment in the tablet view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "tabletRightSegmentToggler" })
        .simulate("click");

      it("toggles the right segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the right segment in the tablet view", () => {
        wrapper
          .find({ handlerid: "tabletRightSegmentToggler" })
          .simulate("click");

        it("toggles the right segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the left segment in the mobile view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "mobileLeftSegmentSwitcher" })
        .first()
        .simulate("click");

      it("toggles the left segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the left segment in the mobile view", () => {
        wrapper
          .find({ handlerid: "mobileLeftSegmentSwitcher" })
          .first()
          .simulate("click");

        it("toggles the left segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the center segment in the mobile view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "mobileCenterSegmentSwitcher" })
        .first()
        .simulate("click");

      it("toggles the center segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the center segment in the mobile view", () => {
        wrapper
          .find({ handlerid: "mobileCenterSegmentSwitcher" })
          .first()
          .simulate("click");

        it("toggles the center segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe("after toggling the right segment in the mobile view", () => {
      const wrapper = mount(component);
      wrapper
        .find({ handlerid: "mobileRightSegmentSwitcher" })
        .first()
        .simulate("click");

      it("toggles the right segment (snapshot)", () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe("after toggling the right segment in the mobile view", () => {
        wrapper
          .find({ handlerid: "mobileRightSegmentSwitcher" })
          .first()
          .simulate("click");

        it("toggles the right segment (snapshot)", () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});
