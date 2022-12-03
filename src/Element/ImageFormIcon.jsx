import React from "react";
import { ReactComponent as ImageFormHandler } from "../Assets/Chatting/ImageForm.svg";
const ImageFormIcon = ({ inputRef }) => {
  const formHandler = () => {
    inputRef.current.click();
  };
  return (
    <>
      <ImageFormHandler
        onClick={formHandler}
        style={{
          width: "27px",
          height: "48px",
          cursor: "pointer",
          marginLeft: "15px",
        }}
      />
    </>
  );
};

export default ImageFormIcon;
