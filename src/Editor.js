import { useState, useRef, useEffect } from "react";
import "./Editor.scss";
import ContentEditable from "react-contenteditable";

import CryptoJS from "crypto-js";

import PasswordOverlay from "./PasswordOverlay";

const Editor = (props) => {
  const ref = useRef();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isoverlayActive, setIsoverlayActive] = useState(false);

  // password, title
  const [overlayType, setOverlayType] = useState("");

  const {
    setIsEditorActive,
    isEditorActive,
    editingNote,
    setEditingNote,
    setNotes,
    notes,
    deleteNote,
  } = props;

  const [encryptionState, setEncryptionState] = useState("encrypt");

  useEffect(() => {
    if (Object.keys(editingNote).length > 0) {
      setEncryptionState(editingNote.isEncrypted ? "decrypt" : "encrypt");
    }
  }, [editingNote.isEncrypted]);

  const encrypt = (texto, pass) => {
    const encrypted = CryptoJS.AES.encrypt(texto, pass);
    return encrypted;
  };

  const decrypt = (texto, pass) => {
    const decrypted = CryptoJS.AES.decrypt(texto, pass);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const save = (state = "null", value = "", encState = "") => {
    // debugger;
    const patt = /<\/*[a-z]+>/g;
    let str;
    let obj;
    const updatedNotes = [...notes];

    let pos = updatedNotes.findIndex((ele) => ele.id === editingNote.id);
    if (state === "encrypt") {
      str = "";
      obj = {
        id: editingNote.id,
        fmtext: value,
        rawtext: str,
        isEncrypted: encState === "decrypt",
        title: editingNote.title,
      };
    } else if (state === "assignTitle") {
      obj = {
        id: editingNote.id,
        fmtext: editingNote.fmtext,
        rawtext: editingNote.rawtext,
        isEncrypted: encState === "decrypt",
        title: value,
      };
    } else {
      str = editingNote.fmtext.split(patt).join(" ");
      obj = {
        id: editingNote.id,
        fmtext: editingNote.fmtext,
        rawtext: str,
        isEncrypted: encState === "decrypt",
        title: editingNote.title,
      };
    }

    if (pos === -1) {
      updatedNotes.push(obj);
    } else {
      updatedNotes[pos] = obj;
    }

    setNotes(updatedNotes);
  };

  const assignTitle = (title) => {
    if (title.length > 100) {
      alert("Title is too long");
      return;
    }
    setIsoverlayActive(false);
    setEditingNote({ ...editingNote, title: title });
    save("assignTitle", title);
  };

  const Encrypt = () => {
    if (editingNote.fmtext.length === 0) {
      alert("Type something first");
      return;
    }
    setOverlayType("password");
    setIsoverlayActive(true);
  };

  const Encrypting = (pass) => {
    const str = editingNote.fmtext;
    console.log("editingnote: ", str);
    let value;
    let encState;
    if (encryptionState === "encrypt") {
      encState = "decrypt";
      const encryptedText = encrypt(str, pass).toString();

      value = encryptedText;
      setEditingNote({ ...editingNote, fmtext: encryptedText });
    } else {
      const decryptedText = decrypt(str, pass);
      if (decryptedText.length === 0) {
        alert("Wrong Password.Try again");

        return;
      }

      encState = "encrypt";
      value = decryptedText;
      setEditingNote({ ...editingNote, fmtext: decryptedText });
    }
    setIsoverlayActive(false);
    setEncryptionState(encState);
    save("encrypt", value, encState);
  };

  const handleChange = (e) => {
    setEditingNote({ ...editingNote, fmtext: e.target.value });
    setIsSaveEnabled(true);
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

  const passwordNote = () => {
    if (overlayType === "password") {
      return encryptionState === "encrypt" ? (
        <div className="passwordNote">
          <span>Note: </span> Make sure to remember the password. Only this
          password will be able to decrypt the current note.
        </div>
      ) : (
        <div className="passwordNote">
          Type the password which you have used to encrypt this before to
          decrypt it.
        </div>
      );
    } else if (overlayType === "title") {
      return (
        <div className="passwordNote">
          Assign the current note a name or title to help to identify a note
          when its encrypted.
        </div>
      );
    } else {
      return <div className="passwordNote"></div>;
    }
  };

  const heading = editingNote.title ? editingNote.title : "Untitled";

  return (
    <div className={`EditorContainer ${isEditorActive ? "active" : ""}`}>
      <div className={`Editor ${isEditorActive ? "active" : ""}`}>
        {isoverlayActive ? (
          <PasswordOverlay
            label={overlayType === "password" ? "Password" : "Title"}
            passwordNote={passwordNote()}
            onSave={overlayType === "password" ? Encrypting : assignTitle}
            setIsoverlayActive={setIsoverlayActive}
          />
        ) : (
          ""
        )}
        <header className="options">
          <div className="leftButtons">
            <button
              title="Close current note"
              onClick={close}
              className="close"
            >
              {"\u00D7"}
            </button>
            <div className="title">
              <span title={heading}>{heading}</span>
              <button
                onClick={() => {
                  setOverlayType("title");
                  setIsoverlayActive(true);
                }}
                className="editTitle"
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="rightButtons">
            <button
              title={`Current note is in ${
                encryptionState === "decrypt" ? "encrypted" : "decrypted"
              } form. Click to ${encryptionState} it.`}
              onClick={Encrypt}
              className="encrypt"
            >
              <i
                class={`fa fa-${
                  encryptionState === "encrypt" ? "lock-open" : "lock"
                }`}
                aria-hidden="true"
              ></i>
            </button>
            <button
              title="Delete the current note"
              onClick={deleteFn}
              className="deleteBtn"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
              title="Save current note"
              onClick={isSaveEnabled ? save : null}
              className={`save ${isSaveEnabled ? "active" : ""}`}
            >
              {"\u2713"}
            </button>
          </div>
        </header>
        <div className="titleBar">{heading}</div>
        <div className="article">
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
