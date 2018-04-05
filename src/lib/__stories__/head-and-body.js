import React from "react";

import { storiesOf } from "@storybook/react";
import { HeadAndBody } from "lib/head-and-body";
import { ThemeProvider } from "styled-components";
import theme from "config/theme";
import { withState } from "recompose";

const Decorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

storiesOf("HeadAndBody", module)
  .addDecorator(Decorator)
  .add("No HOC", () => (
    <HeadAndBody
      head={() => <h1>Static Head</h1>}
      body={() => <div>Static Body</div>}
    />
  ))
  .add("With HOC", () => (
    <HeadAndBody
      hoc={withState("counter", "setCounter", 0)}
      head={({ counter, setCounter }) => (
        <div>
          <h1>Counter: {counter}</h1>
          <button onClick={() => setCounter(counter + 1)}>Increment</button>
        </div>
      )}
      body={({ counter, setCounter }) => (
        <div>
          <h1>Counter: {counter}</h1>
          <button onClick={() => setCounter(0)}>Reset</button>
        </div>
      )}
    />
  ));
