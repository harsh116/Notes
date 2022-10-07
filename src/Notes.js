import "./Notes.scss";
import ReactHtmlParser from "react-html-parser";

function generate_token(length) {
  //edit the token allowed characters
  const a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  const b = [];
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

const Note = (props) => {
  const { note, setIsEditorActive, setEditingNote, deleteNote } = props;

  const openCurrentNote = () => {
    setIsEditorActive(true);
    const obj = {
      id: note.id,
      fmtext: note.fmtext,
      isEncrypted: note.isEncrypted,
      title: note.title,
    };
    setEditingNote(obj);
  };

  return (
    <div onClick={openCurrentNote} className="Note">
      <button
        className="deleteCross"
        onClick={(e) => {
          e.stopPropagation();
          deleteNote(note.id);
        }}
      >
        {"\u00D7"}
      </button>
      <div className="titleSection">{note.title}</div>
      <div className="noteSection">{ReactHtmlParser(note.fmtext)}</div>
    </div>
  );
};

const Notes = (props) => {
  const { notes, setIsEditorActive, setEditingNote, deleteNote } = props;

  const noteArray = notes.map((note) => {
    return (
      <Note
        setIsEditorActive={setIsEditorActive}
        key={generate_token(5)}
        note={note}
        setEditingNote={setEditingNote}
        deleteNote={deleteNote}
      />
    );
  });

  const emptyNoteMessage = () => {
    return <div className="emptyMessage">No notes here</div>;
  };

  return (
    <div className="Notes">
      {noteArray && noteArray.length > 0 ? noteArray : emptyNoteMessage()}
    </div>
  );
};

export default Notes;
