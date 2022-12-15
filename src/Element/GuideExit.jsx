import React from "react";
import { ReactComponent as ExitIconItem } from "../Assets/Chatting/Exit.svg";
import { useNavigate } from "react-router-dom";
const GuideExit = ({ isModal, setIsModal }) => {
  const navigate = useNavigate();

  return (
    <ExitIconItem
      onClick={() => setIsModal(!isModal)}
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "30px",
        top: "40px",
      }}
    />
  );
};

export default GuideExit;
