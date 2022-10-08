import { useState, useEffect } from "react";
import "./App.scss";

import Notes from "./Notes";
import Editor from "./Editor";
import Search from "./Search";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [editingNote, setEditingNote] = useState({});
  const [idgenerate, setIdgenerate] = useState(0);
  const deleteNote = (id) => {
    const updatedNotes = [...notes];
    const pos = updatedNotes.findIndex((ele) => ele.id === id);
    updatedNotes.splice(pos, 1);
    setNotes(updatedNotes);
  };

  const invertColors = (theme) => {
    const invertPercent = theme === "dark" ? 100 : 0;
    const css = `html {
      -webkit-filter: invert(${invertPercent}%);
      -moz-filter: invert(${invertPercent}%);
      -o-filter: invert(${invertPercent}%);
      -ms-filter: invert(${invertPercent}%);
    }

    html img,video,iframe{
      -webkit-filter: invert(${invertPercent}%);
      -moz-filter: invert(${invertPercent}%);
      -o-filter: invert(${invertPercent}%);
      -ms-filter: invert(${invertPercent}%);
    }
    
    `;
    const head = document.head;
    const style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
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

    // invertColors();
  }, []);

  useEffect(() => {
    const arrString = JSON.stringify(notes);
    localStorage.setItem("notes", arrString);
    console.log("notes: ", notes);
  }, [notes]);

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      invertColors("dark");
    } else {
      setCurrentTheme("light");
      invertColors("light");
    }
  };

  const openNewNote = () => {
    setIsEditorActive(true);
    const obj = {
      id: idgenerate,
      fmtext: "",
      isEncrypted: false,
      title: "Untitled",
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
      <button onClick={toggleTheme} className="toggleTheme">
        <i
          class={`fa fa-${currentTheme === "light" ? "sun" : "moon"}-o`}
          aria-hidden="true"
        ></i>
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
