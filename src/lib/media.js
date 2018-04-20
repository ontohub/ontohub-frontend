import { css } from "styled-components";

// These sizes and key names are tailored to Semantic-UI
const sizes = {
  largeScreenOnly: { min: 1200 },
  computerOnly: { min: 992, max: 1199 },
  tabletOnly: { min: 768, max: 991 },
  mobileOnly: { max: 767 },

  largeScreen: { min: 1200 },
  computer: { min: 992 },
  tablet: { min: 768 },
  mobile: { min: 0 }
};

// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
const emSize = pxSize => pxSize / 16;

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const intervals = [];
  if (sizes[label].min) {
    intervals.push(`(min-width: ${emSize(sizes[label].min)}em)`);
  }
  if (sizes[label].max) {
    intervals.push(`(max-width: ${emSize(sizes[label].max)}em)`);
  }
  accumulator[label] = (...args) => css`
    @media ${intervals.join(" and ")} {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
