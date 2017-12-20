import React from "react";
import { compose, defaultProps, withProps, withStateHandlers } from "recompose";
import { Button, Grid } from "semantic-ui-react";
import AceEditor from "react-ace";
import brace from "brace";
import "brace/keybinding/vim";
import "brace/theme/github";

const StaticEditor = ({
  reservedHeaderHeight,
  filename,
  value,
  defaultValue,
  cursorPosition,
  isEditingPermitted,
  onChange,

  // Hard-coded props. Cannot be changed by the caller:
  isEditing,
  toggleEditingMode,
  onChangeValueUpdater,
  resetValue,
  cursorPositionWasSet,
  setInitialCursorPosition,
  keepCursorAt,

  ...aceEditorProps
}) => {
  let editor = null;

  return (
    <div>
      {isEditingPermitted && (
        <Button.Group attached="top">
          <Button
            onClick={() => {
              keepCursorAt(editor.editor.getCursorPosition());
              toggleEditingMode();
              editor.refEditor.getElementsByTagName("textarea")[0].focus();
            }}
            color={isEditing ? "green" : "blue"}
            icon={isEditing ? "edit" : "eye"}
            content={isEditing ? "Editing Mode" : "Reading Mode"}
          />
          {isEditing && (
            <Button
              onClick={() => {
                if (confirm("Really revert the changes?")) {
                  resetValue(defaultValue);
                  toggleEditingMode();
                  editor.refEditor.getElementsByTagName("textarea")[0].focus();
                }
              }}
              color="red"
              icon="trash outline"
              content="Revert Changes"
            />
          )}
        </Button.Group>
      )}
      <AceEditor
        ref={input => {
          editor = input;
          if (!cursorPositionWasSet) {
            editor && editor.editor.moveCursorToPosition(cursorPosition);
            setInitialCursorPosition();
          }
        }}
        theme="github"
        name={`editor-${filename}`}
        value={value}
        defaultValue={defaultValue}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ cursorStyle: "smooth" }}
        // keyboardHandler="vim" // or "emacs" or null
        width="100%"
        height={`calc(100vh - ${
          isEditingPermitted ? "36px" : "0px" // minus the Button.Group height
        } - ${reservedHeaderHeight}px)`}
        tabSize={2}
        debounceChangePeriod={100}
        {...aceEditorProps}
        readOnly={isEditingPermitted ? !isEditing : true}
        onChange={(value, changeEvent) => {
          onChangeValueUpdater(value, changeEvent);
          onChange && onChange(value, changeEvent);
        }}
      />
    </div>
  );
};

export default compose(
  defaultProps({
    isEditingPermitted: false,
    reservedHeaderHeight: 0
  }),
  withStateHandlers(
    ({
      isEditingInitially = false,
      initialValue = "",
      initialCursorPosition = { row: 0, column: 0 },
      cursorPositionWasSet = false
    }) => ({
      isEditing: isEditingInitially,
      value: initialValue,
      cursorPosition: initialCursorPosition
    }),
    {
      toggleEditingMode: ({ isEditing }) => () => ({
        isEditing: !isEditing
      }),
      onChangeValueUpdater: () => (newValue, changeEvent) => ({
        value: newValue
      }),
      resetValue: () => defaultValue => ({
        value: defaultValue
      }),
      setInitialCursorPosition: () => () => ({ cursorPositionWasSet: true }),
      keepCursorAt: () => currentCursorPosition => ({
        cursorPosition: currentCursorPosition
      })
    }
  )
)(StaticEditor);
