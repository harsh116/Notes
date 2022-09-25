import { useState, useEffect } from "react";
import "./App.scss";

import Notes from "./Notes";
import Editor from "./Editor";
import Search from "./Search";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [editingNote, setEditingNote] = useState({});
  const [idgenerate, setIdgenerate] = useState(0);
  const deleteNote = (id) => {
    const updatedNotes = [...notes];
    const pos = updatedNotes.findIndex((ele) => ele.id === id);
    updatedNotes.splice(pos, 1);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const notestring = localStorage.getItem("notes");
    if (notestring && notestring.length > 0) {
      const noteobj = JSON.parse(notestring);
      setNotes(noteobj);
    }
    let currId = localStorage.getItem("noteID");
    if (currId) {
      setIdgenerate(Number(currId));
    } else {
      localStorage.setItem("noteID", "0");
    }
  }, []);

  useEffect(() => {
    const arrString = JSON.stringify(notes);
    localStorage.setItem("notes", arrString);
    console.log("notes: ", notes);
  }, [notes]);

  const openNewNote = () => {
    setIsEditorActive(true);
    const obj = {
      id: idgenerate,
      fmText: "",
    };

    setEditingNote(obj);
    setIdgenerate(idgenerate + 1);
    localStorage.setItem("noteID", (idgenerate + 1).toString());
  };

  return (
    <div className="App">
      <Search
        setIsSearching={setIsSearching}
        notes={notes}
        setSearchedNotes={setSearchedNotes}
      />
      <Notes
        setIsEditorActive={setIsEditorActive}
        notes={isSearching ? searchedNotes : notes}
        setEditingNote={setEditingNote}
        deleteNote={deleteNote}
      />
      <button onClick={openNewNote} className="addNew">
        {"\u002B"}
      </button>
      <Editor
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        isEditorActive={isEditorActive}
        setIsEditorActive={setIsEditorActive}
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
