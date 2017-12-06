import React from "react";

import { storiesOf } from "@storybook/react";

import { ThemeProvider } from "styled-components";
import theme from "../../styles";
import {
  DynamicTree as Tree,
  DirectoryTree,
  directoryIcon,
  directoryLabel,
  fileIcon,
  fileLabel
} from "../Tree";
import { Icon, List } from "semantic-ui-react";
import GitLsFilesToTree from "../Tree/GitLsFilesToTree";

const Decorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

storiesOf("Tree", module)
  .addDecorator(Decorator)
  .add("Exhaustive pattern", () => (
    <Tree
      tree={GitLsFilesToTree([
        "A/AA/AAA/a",
        "A/AB/ABA/a",
        "A/AB/ABA/b",
        "A/AB/ABA/c",
        "A/AB/ABB/a",
        "A/AB/ABB/b",
        "A/AB/ABB/c",
        "A/AB/a",
        "A/AB/b",
        "A/a",
        "B/BA/BAA/BAAA/a",
        "a",
        "b",
        "c",
        "d"
      ])}
      initiallyOpenNodes={["A", "A/AB", "A/AB/ABB", "B", "B/BA/BAA"]}
      innerNodeIcon={(label, path, toggle, isOpen) => (
        <List.Icon name="folder outline" onClick={toggle} />
      )}
      innerNodeLabel={(label, path, toggle) => (
        <List.Header onClick={toggle}>{label}</List.Header>
      )}
      leafIcon={(label, path) => <List.Icon name="file outline" />}
      leafLabel={(label, path) => <List.Header>{label}</List.Header>}
    />
  ))
  .add("with seed entries", () => (
    <DirectoryTree
      tree={GitLsFilesToTree([
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
  ));
