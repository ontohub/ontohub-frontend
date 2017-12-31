import React from "react";
import { gitLsFilesToTree } from "./components/Tree/helpers";

import { Header, Panes, DirectoryTree } from "./components";

const PureRepository = ({
  match: { params: { organizationalUnitId, repositoryId } }
}) => {
  const height = 0;
  const ChildLeft = () => (
    <DirectoryTree
      tree={gitLsFilesToTree([
        "Basic/Numbers.casl",
        "Basic/RelationsAndOrders.casl",
        "NativeDocuments/cat.clif",
        "NativeDocuments/pizza.owl",
        "icons/ontohub.jpg",
        "icons/ontohub.png",
        "icons/ontohub.svg",
        "new_folder/.gitkeep",
        "pdf/ontohub.pdf",
        "texts/ontohub.txt",
        "texts/ontohub_changed.txt",
        "texts/ontohub_changed_renamed.txt",
        "texts/ontohub_created.txt",
        "texts/ontohub_renamed.txt"
      ])}
      initiallyOpenNodes={["Basic", "texts"]}
    />
  );
  const ChildCenter = () => null;
  const ChildRight = () => null;
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

const Repository = PureRepository;
export { Header, Repository };
