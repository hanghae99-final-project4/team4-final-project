import React from "react";
import { ReactComponent as ExitIconItem } from "../Assets/Chatting/Exit.svg";

const GuideExit = ({ isModal, setIsModal }) => {
  return (
    <ExitIconItem
      onClick={() => setIsModal(!isModal)}
      style={{
        cursor: "pointer",
        position: "relative",
        left: "270px",
        top: "-320px",
      }}
    />
  );
};

export default GuideExit;
