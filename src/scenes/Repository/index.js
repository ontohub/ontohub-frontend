import React from "react";
import { get } from "lodash";
import { gitLsFilesToTree } from "./components/Tree/helpers";

import { Header, Panes, DirectoryTree } from "./components";

const PureRepository = ({
  match: { params: { organizationalUnitId, repositoryId } },
  data
}) => {
  const height = 0;
  const ChildLeft = () => (
    <DirectoryTree
      tree={gitLsFilesToTree(get(data, "repository.commit.lsFiles"))}
      initiallyOpenNodes={[]}
    />
  );
  const ChildCenter = () => <div>This is the main content</div>;
  const ChildRight = () => <div>This is the context</div>;
  return (
    <Panes
      reservedHeaderHeight={height}
      childLeft={ChildLeft}
      childCenter={ChildCenter}
      childRight={ChildRight}
      labelLeft="Files"
      labelCenter="Details"
      labelRight="Context"
      leftSegmentIsOpenInitially={true}
      rightSegmentIsOpenInitially={false}
    />
  );
};

export { Header, PureRepository as Repository };
