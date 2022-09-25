import { useState, useRef } from "react";
import "./Editor.scss";
import ContentEditable from "react-contenteditable";

const Editor = (props) => {
  const ref = useRef();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const {
    setIsEditorActive,
    isEditorActive,
    editingNote,
    setEditingNote,
    setNotes,
    notes,
    deleteNote,
  } = props;

  const handleChange = (e) => {
    setEditingNote({ ...editingNote, fmtext: e.target.value });
    setIsSaveEnabled(true);
  };

  const save = () => {
    const patt = /<\/*[a-z]+>/g;
    const str = editingNote.fmtext.split(patt).join(" ");

    const updatedNotes = [...notes];

    let pos = updatedNotes.findIndex((ele) => ele.id === editingNote.id);
    const obj = {
      id: editingNote.id,
      fmtext: editingNote.fmtext,
      rawtext: str,
    };
    if (pos === -1) {
      updatedNotes.push(obj);
    } else {
      updatedNotes[pos] = obj;
    }

    setNotes(updatedNotes);
  };

  const close = () => {
    setIsEditorActive(false);
    setEditingNote({});
    setIsSaveEnabled(false);
  };

  const deleteFn = () => {
    setIsEditorActive(false);
    setIsSaveEnabled(false);
    deleteNote(editingNote.id);
  };

  return (
    <div className={`EditorContainer ${isEditorActive ? "active" : ""}`}>
      <div className={`Editor ${isEditorActive ? "active" : ""}`}>
        <header className="options">
          <button onClick={close} className="close">
            {"\u00D7"}
          </button>
          <div className="rightButtons">
            <button onClick={deleteFn} className="deleteBtn">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
              onClick={isSaveEnabled ? save : null}
              className={`save ${isSaveEnabled ? "active" : ""}`}
            >
              {"\u2713"}
            </button>
          </div>
        </header>
        <div className="article">
          {/* <div className="edit" contentEditable></div> */}
          <ContentEditable
            className="edit"
            html={editingNote.fmtext ? editingNote.fmtext : ""}
            innerRef={ref}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
