// import { useState } from "react";
import "./Overlay.scss";

const Overlay = (props) => {
  const { setIsBaseOverlayActive, closeOverlayFn, OkOverlayFn } = props;

  return (
    <div className="Overlay">
      <div className="Box">
        {props.children}
        <div className="Buttons">
          <button onClick={OkOverlayFn} className="select">
            {"OK \u2713"}
          </button>
          <button
            onClick={() => {
              setIsBaseOverlayActive(false);
              closeOverlayFn();
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

export default Overlay;
