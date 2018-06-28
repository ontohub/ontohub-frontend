import React from "react";
import {
  Button,
  Container,
  Form,
  Header as SemHeader,
  Radio
} from "semantic-ui-react";
import { PaddedContainer } from "lib/padded-container";

export const Header = () => (
  <PaddedContainer>
    <SemHeader as="h2" inverted>
      Create a New Repository
      <SemHeader.Subheader>
        Or use an existing one hosted elsewhere
      </SemHeader.Subheader>
    </SemHeader>
  </PaddedContainer>
);

const Body = () => (
  <Container text>
    <Form>
      <Form.Input label="Name" placeholder="Name" />
      <Form.Input label="Description" placeholder="Description" />

      <Form.Group inline>
        <Form.Field control={Radio} label="New" />
        <Form.Field control={Radio} label="Import" />
        <Form.Field control={Radio} label="Mirror" />
      </Form.Group>

      <Form.Input label="Origin URL" placeholder="Origin URL" />

      <Button floated="right" positive>
        Create
      </Button>
    </Form>
  </Container>
);

export default { Header, Body };
