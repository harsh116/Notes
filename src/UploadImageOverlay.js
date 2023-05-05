import { useEffect, useState } from "react";

import "./UploadImageOverlay.scss";
import Overlay from "./Overlay";

import { pasteHtmlAtCaret } from "./extras/uploadImage";

const UploadImageSection = (props) => {
  const { setImageType, setFile, setImageURL, setURI } = props.contentProps;

  const handleUpload = (e) => {
    setImageType("file");
    const file = e.target.files?.[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      //   console.log("readerResult: ", reader.result);
      setURI(reader.result);
    };
  };

  return (
    <div className="uploadSection">
      <label htmlFor="">Paste URL of image</label>
      <input
        type="text"
        onChange={(e) => {
          setImageURL(e.target.value);
          setImageType("url");
        }}
      />
      <br />
      <br />
      <div>
        <b>
          <center>OR</center>{" "}
        </b>{" "}
      </div>
      <br />
      <label htmlFor="">Choose image to upload</label>
      <input
        type="file"
        className="uploadImageInput"
        accept="image/*"
        onChange={handleUpload}
      />
    </div>
  );
};

const UploadImageOverlay = (props) => {
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState({});
  const [uri, setURI] = useState("");

  //url or file
  const [imageType, setImageType] = useState("");

  const {
    setIsBaseOverlayActive,
    // sel,
    setExpandedOptionsVisibilityState,
    range,
    setHtml,
  } = props;

  const contentProps = {
    imageURL,
    setImageURL,
    file,
    setFile,
    imageType,
    setImageType,
    setURI,
  };

  const uploadImage = () => {
    let ihtml = "";
    console.log("okupload");

    if (imageType === "url") {
      ihtml = `<img style="max-height: 350px;" src="${imageURL}" >`;
    } else if (imageType === "file") {
      ihtml = `<img style="max-height: 350px;" src="${uri}" >`;
    }

    console.log("ihtml: ", ihtml);
    setHtml(ihtml);
    // pasteHtmlAtCaret(html);
    setIsBaseOverlayActive(false);
    setExpandedOptionsVisibilityState(false);
  };

  const doNothing = () => {
    setIsBaseOverlayActive(false);
    setFile({});
    setImageURL("");
    setImageType("");
    console.log("cancel upload");
  };

  return (
    <Overlay
      setIsBaseOverlayActive={setIsBaseOverlayActive}
      closeOverlayFn={doNothing}
      OkOverlayFn={uploadImage}
    >
      <UploadImageSection contentProps={contentProps} />
    </Overlay>
  );
};

export default UploadImageOverlay;
