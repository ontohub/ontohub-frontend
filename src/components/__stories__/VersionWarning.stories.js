import React from "react";

import { storiesOf } from "@storybook/react";

import VersionWarning from "../VersionWarning";

storiesOf("VersionWarning", module)
  .addWithInfo(
    "Requirement not fulfilled",
    `This is displayed when the backend version is not compatible to the
     required version.`,
    () => <VersionWarning requirement="~ 0.1.0" version="0.2.1" />
  )
  .addWithInfo(
    "Server unreachable",
    `This is displayed when there was some
     kind of error while trying to get the backend version`,
    () => <VersionWarning error={true} />
  )
  .addWithInfo(
    "Requirement fulfilled",
    "When the version matches the requirement, the warning is hidden",
    () => <VersionWarning requirement="~ 0.1.0" version="0.1.1" />
  );
