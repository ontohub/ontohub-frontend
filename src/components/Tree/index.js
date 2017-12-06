import React, { Component } from "react";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import { compose, defaultProps, withStateHandlers } from "recompose";
import { includes, last, map, without } from "lodash";
import styled from "styled-components";
import { Icon, List } from "semantic-ui-react";

const transitionDuration = 400; // milliseconds

const SubtreeContainer = styled.div`
  & .subtree-container-height {
    transition: height ${transitionDuration}ms ease-in-out;
  }
`;

const InnerNodeOpener = ({ isOpen, path, onClick }) => {
  const dropdownIconRotation = isOpen ? 0 : -90;
  const dropdownIconX = isOpen ? 2 : 0;
  const dropdownIconY = isOpen ? 0 : 2;
  const dropdownIconStyle = {
    transition: `all ${transitionDuration}ms`,
    transformOrigin: "4px 6px 0",
    transform: `translateX(${dropdownIconX}px) translateY(${
      dropdownIconY
    }px) rotate(${dropdownIconRotation}deg)`
  };

  return (
    <Icon
      data-type="inner-node-opener"
      data-path={path}
      name="dropdown"
      style={dropdownIconStyle}
      onClick={onClick}
    />
  );
};

// Expanding the width is needed for the Transition to look smooth.
const Transition = ({ children }) => (
  <ReactCSSTransitionReplace
    changeWidth={false}
    transitionName="subtree-container"
    transitionEnterTimeout={transitionDuration}
    transitionLeaveTimeout={transitionDuration}
    style={{ width: "100%" }}
  >
    {children}
  </ReactCSSTransitionReplace>
);

// Expanding the width is needed for the Transition to look smooth.
const WideListContent = styled(List.Content)`
  width: 100%;
`;

const InnerNode = ({ path, name, isOpen, icon, label, toggle, children }) => (
  <List.Item>
    <InnerNodeOpener path={path} isOpen={isOpen} onClick={toggle} />
    {icon(name, path, toggle, isOpen)}
    <WideListContent style={{ paddingLeft: 0 }}>
      {label(name, path, toggle)}
      <Transition>
        {isOpen ? (
          <SubtreeContainer key={path}>
            <List.List style={{ paddingLeft: 0 }}>{children}</List.List>
          </SubtreeContainer>
        ) : null}
      </Transition>
    </WideListContent>
  </List.Item>
);

const LeafNode = ({ path, name, icon, label }) => (
  <List.Item key={path}>
    {icon(name, path)}
    <WideListContent>{label(name, path)}</WideListContent>
  </List.Item>
);

export const StaticTree = ({
  tree,
  openNodes,
  toggleInnerNode,
  innerNodeIcon,
  innerNodeLabel,
  leafIcon,
  leafLabel
}) => {
  const renderInnerNode = (tree, name) => (
    <InnerNode
      key={tree.path}
      path={tree.path}
      name={name}
      isOpen={includes(openNodes, tree.path)}
      toggle={() => toggleInnerNode(tree.path)}
      icon={innerNodeIcon}
      label={innerNodeLabel}
    >
      {renderSubtree(tree)}
    </InnerNode>
  );

  const renderLeaf = fileInfo => (
    <LeafNode
      key={fileInfo.path}
      path={fileInfo.path}
      name={fileInfo.name}
      icon={leafIcon}
      label={leafLabel}
    />
  );

  const renderSubtree = tree =>
    [
      map(tree.directories, renderInnerNode),
      map(tree.files, renderLeaf)
    ].concat();

  return (
    <Transition>
      <SubtreeContainer key="/">
        <List>{renderSubtree(tree)}</List>
      </SubtreeContainer>
    </Transition>
  );
};

export const directoryLabel = (label, path, toggle) => (
  <List.Header>{label}</List.Header>
);

export const directoryIcon = (label, path, toggle, isOpen) => (
  <List.Icon verticalAlign="top" style={{ width: "15px" }}>
    <Icon name={isOpen ? "folder outline open" : "folder outline"} />
  </List.Icon>
);

export const fileLabel = (label, path) => <List.Header>{label}</List.Header>;

export const fileIcon = (label, path) => {
  let name;
  switch (last(label.split(".")).toLowerCase()) {
    case "txt":
      name = "file text outline";
      break;
    case "pdf":
      name = "file pdf outline";
      break;
    case "bat":
    case "bmp":
    case "bpg":
    case "exif":
    case "gif":
    case "heif":
    case "jfif":
    case "jpeg":
    case "jpeg2000":
    case "jpg":
    case "pbm":
    case "pgm":
    case "png":
    case "pnm":
    case "ppm":
    case "svg":
    case "tiff":
    case "webp":
      name = "file image outline";
      break;
    case "3gp":
    case "asf":
    case "avi":
    case "flv":
    case "gifv":
    case "mkv":
    case "mov":
    case "mp4":
    case "mpeg":
    case "mpg":
    case "mwv":
    case "qt":
    case "ts":
    case "vob":
    case "webm":
      name = "file video outline";
      break;
    case "aac":
    case "flac":
    case "mp3":
    case "ogg":
    case "wav":
      name = "file audio outline";
      break;
    case "doc":
    case "docx":
      name = "file word outline";
      break;
    case "xls":
    case "xlsx":
      name = "file excel outline";
      break;
    case "ppt":
    case "pptx":
      name = "file powerpoint outline";
      break;
    case "7z":
    case "bz2":
    case "gz":
    case "rar":
    case "tar":
    case "xz":
    case "zip":
      name = "file archive outline";
      break;
    case "casl":
    case "dol":
    case "hascasl":
    case "het":
    case "owl":
    case "omn":
    case "obo":
    case "hs":
    case "exp":
    case "maude":
    case "elf":
    case "hol":
    case "isa":
    case "thy":
    case "prf":
    case "omdoc":
    case "hpf":
    case "clf":
    case "clif":
    case "xml":
    case "fcstd":
    case "rdf":
    case "xmi":
    case "qvt":
    case "p":
    case "tptp":
    case "gen_trm":
    case "baf":
      name = "file code outline";
      break;
    default:
      name = "file outline";
      break;
  }
  return <List.Icon name={name} />;
};

const withOpeningHandler = withStateHandlers(
  ({ initiallyOpenNodes = [] }) => ({
    openNodes: initiallyOpenNodes
  }),
  {
    toggleInnerNode: ({ openNodes }) => path => ({
      openNodes: includes(openNodes, path)
        ? without(openNodes, path)
        : [...openNodes, path]
    })
  }
);

const withDirectoryStructure = defaultProps({
  innerNodeIcon: directoryIcon,
  innerNodeLabel: directoryLabel,
  leafIcon: fileIcon,
  leafLabel: fileLabel
});

export const DynamicTree = withOpeningHandler(StaticTree);

export const DirectoryTree = compose(
  withDirectoryStructure,
  withOpeningHandler
)(StaticTree);
