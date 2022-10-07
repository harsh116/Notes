import { useState } from "react";
import "./PasswordOverlay.scss";

const PasswordOverlay = (props) => {
  const [pass, setPass] = useState("");
  const { onSave, setIsoverlayActive, passwordNote, label } = props;

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const passwordSelect = () => {
    if (pass.length === 0) {
      return;
    }
    onSave(pass);
    setPass("");
  };

  return (
    <div className="PasswordOverlay">
      <div className="passwordBox">
        <div className="passwordSection">
          <label>{`${label}: `} </label>
          <input autoFocus={true} type="text" onChange={handleChange} />
        </div>
        {passwordNote}
        <div className="passwordButtons">
          <button onClick={passwordSelect} className="select">
            {"OK \u2713"}
          </button>
          <button
            onClick={() => {
              setIsoverlayActive(false);
              setPass("");
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
