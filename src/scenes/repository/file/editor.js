import React from "react";
import { compose, defaultProps, withStateHandlers } from "recompose";
import { Button, Header, Modal } from "semantic-ui-react";
import AceEditor from "react-ace";
import "brace/keybinding/vim";
import "brace/theme/github";

const PureEditor = ({
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
  revertChangesModalIsOpen,
  openRevertChangesModal,
  closeRevertChangesModal,

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
            <Modal
              trigger={
                <Button
                  color="red"
                  icon="trash outline"
                  content="Discard Changes"
                  data-testid="reset-button"
                  onClick={openRevertChangesModal}
                />
              }
              basic
              size="small"
              open={revertChangesModalIsOpen}
            >
              <Header icon="trash outline" content="Discard Changes" />
              <Modal.Content>
                <p>Revert the changes to the original state?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="grey"
                  icon="close"
                  content="Cancel"
                  inverted
                  onClick={closeRevertChangesModal}
                />
                <Button
                  onClick={
                    /* istanbul ignore next */ () => {
                      resetValue(defaultValue);
                      closeRevertChangesModal();
                      toggleEditingMode();
                      editor.refEditor
                        .getElementsByTagName("textarea")[0]
                        .focus();
                    }
                  }
                  basic
                  color="red"
                  icon="trash outline"
                  content="Discard"
                  inverted
                />
              </Modal.Actions>
            </Modal>
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
        onChange={
          /* istanbul ignore next */ (value, changeEvent) => {
            onChangeValueUpdater(value, changeEvent);
            onChange && onChange(value, changeEvent);
          }
        }
      />
    </div>
  );
};

export const Editor = compose(
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
      cursorPosition: initialCursorPosition,
      revertChangesModalIsOpen: false
    }),
    {
      toggleEditingMode: ({ isEditing }) => () => ({
        isEditing: !isEditing
      }),
      onChangeValueUpdater: /* istanbul ignore next */ () => (
        newValue,
        changeEvent
      ) => ({
        value: newValue
      }),
      resetValue: /* istanbul ignore next */ () => defaultValue => ({
        value: defaultValue
      }),
      setInitialCursorPosition: () => () => ({ cursorPositionWasSet: true }),
      keepCursorAt: () => currentCursorPosition => ({
        cursorPosition: currentCursorPosition
      }),
      openRevertChangesModal: /* istanbul ignore next */ () => () => ({
        revertChangesModalIsOpen: true
      }),
      closeRevertChangesModal: /* istanbul ignore next */ () => () => ({
        revertChangesModalIsOpen: false
      })
    }
  )
)(PureEditor);
