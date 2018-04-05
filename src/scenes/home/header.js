import React from "react";
import { Header as SemHeader, List } from "semantic-ui-react";
import { PaddedContainer } from "lib/padded-container";
import { Item } from "./item";

export const Header = () => (
  <PaddedContainer>
    <SemHeader as="h2" inverted>
      Welcome to Ontohub
    </SemHeader>
    <List size="large">
      <Item icon="fork" header="Open" content="based on open source software" />
      <Item
        icon="code"
        header="Flexible"
        content="supporting OWL, UML, FOL/TPTP, HOL/THF, and more"
      />
      <Item
        icon="sitemap"
        header="Distributed"
        content="OMS alignments, mappings, networks, combinations using DOL"
      />
    </List>
  </PaddedContainer>
);
