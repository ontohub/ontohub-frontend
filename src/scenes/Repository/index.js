import React, { Fragment } from "react";
import { get } from "lodash";
import { gitLsFilesToTree } from "./components/Tree/helpers";
import { withRouter } from "react-router-dom";

import { Header, Panes, DirectoryTree } from "./components";
import { Container, Dropdown, Message } from "semantic-ui-react";

const BranchDropdown = withRouter(
  ({ history, revision, branches = [], repo, defaultBranch }) => (
    <Dropdown
      placeholder="Choose branch"
      selection
      fluid
      defaultValue={revision ? decodeURIComponent(revision) : defaultBranch}
      disabled={branches.length < 2}
      options={branches.map(branch => ({
        text: branch,
        value: branch
      }))}
      onChange={(event, { value }) => {
        let newPath;
        if (value === defaultBranch) {
          newPath = `/${repo}`;
        } else {
          newPath = `/${repo}/rev/${encodeURIComponent(value)}`;
        }
        history.push(newPath);
      }}
    />
  )
);

const PureRepository = ({
  match: { params: { organizationalUnitId, repositoryId, revision } },
  data
}) => {
  const height = 0;
  const ChildLeft = () => (
    <Fragment>
      <BranchDropdown
        repo={`${organizationalUnitId}/${repositoryId}`}
        revision={revision}
        branches={get(data, "repository.branches")}
        defaultBranch={get(data, "repository.defaultBranch")}
      />
      <DirectoryTree
        tree={gitLsFilesToTree(get(data, "repository.commit.lsFiles"))}
        initiallyOpenNodes={[]}
      />
    </Fragment>
  );
  const ChildCenter = () => (
    <Container text>
      <pre>{get(data, "repository.commit.readme.content")}</pre>
    </Container>
  );
  const ChildRight = () => <div>This is the context</div>;
  if (!data.loading && !get(data, "repository.commit")) {
    return (
      <Container text>
        <Message size="tiny" info>
          <Message.Header>This repository is empty</Message.Header>
        </Message>
      </Container>
    );
  }
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
