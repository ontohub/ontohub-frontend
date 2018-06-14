import _ from "lodash";

const insertInnerNodePaths = (tree, parentPath) => {
  _.each(tree.directories, (subtree, directoryName) => {
    const path =
      parentPath === "" ? directoryName : `${parentPath}/${directoryName}`;
    subtree.path = path;
    insertInnerNodePaths(subtree, path);
  });
};

export const gitLsFilesToTree = gitLsFiles => {
  const resultTree = {};
  _.each(gitLsFiles, filepath => {
    const pathComponents = _.split(filepath, "/");
    const dirnameComponents = _.initial(pathComponents);
    const filename = _.last(pathComponents);
    // intersperse "directories" into dirnameComponents
    const objectPath = [].concat(
      ...dirnameComponents.map(e => ["directories", e])
    );
    objectPath.push("files");

    const fileInfo = { name: filename, path: filepath };
    _.update(resultTree, objectPath, directoryListing => {
      if (directoryListing instanceof Array) {
        directoryListing.push(fileInfo);
        return directoryListing;
      } else {
        return [fileInfo];
      }
    });
  });
  insertInnerNodePaths(resultTree, "");
  return resultTree;
};
