import { useState, useEffect } from "react";
import "./App.scss";

import Notes from "./Notes";
import Editor from "./Editor";
import Search from "./Search";
import { generate_token } from "./helper";

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

  const exp = () => {
    console.log("exportall");
    const noteID = localStorage.getItem("noteID");
    const source = localStorage.getItem("source");
    const arrString = JSON.stringify({ noteID, source, notes });
    // console.log(arrString);
    const blob = new Blob([arrString], { type: "text/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "export.json";
    link.href = url;
    link.click();
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

    let source = localStorage.getItem("source");
    if (!source) {
      localStorage.setItem("source", "formattedNotes");
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
      <button title="Export notes" className="exportAll" onClick={exp}>
        <i className="fa-solid fa-file-export"></i>
      </button>
      <button title="Import single note" className="importSingle">
        <i class="fa-solid fa-upload"></i>
      </button>

      <button title="Import all notes" className="importAll">
        <i class="fa-solid fa-file-import"></i>
      </button>

      <button onClick={openNewNote} className="addNew">
        {"\u002B"}
      </button>
      <button onClick={toggleTheme} className="toggleTheme">
        <i
          class={`fa-solid fa-${currentTheme === "light" ? "sun" : "moon"}`}
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
