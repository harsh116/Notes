import { useState } from "react";
import "./PasswordOverlay.scss";

const PasswordOverlay = (props) => {
  const [pass, setPass] = useState("");
  const { Encrypting, setIsoverlayActive, encryptionState } = props;

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const passwordSelect = () => {
    if (pass.length === 0) {
      return;
    }
    Encrypting(pass);
  };

  return (
    <div className="PasswordOverlay">
      <div className="passwordBox">
        <div className="passwordSection">
          <label>Password: </label>
          <input type="text" onChange={handleChange} />
        </div>
        {encryptionState === "encrypt" ? (
          <div className="passwordNote">
            <span>Note: </span> Make sure to remember the password. Only this
            password will be able to decrypt the current note.
          </div>
        ) : (
          <div className="passwordNote">
            Type the password which you have used to encrypt this before to
            decrypt it.
          </div>
        )}
        <div className="passwordButtons">
          <button onClick={passwordSelect} className="select">
            {"OK \u2713"}
          </button>
          <button
            onClick={() => {
              setIsoverlayActive(false);
            }}
            className="close"
          >
            {"Cancel \u00D7"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordOverlay;
