import React from "react";
import { ReactComponent as ExitIconItem } from "../Assets/Chatting/Exit.svg";
import { useNavigate } from "react-router-dom";
const GuideExit = () => {
  const navigate = useNavigate();

  return (
    <ExitIconItem
      onClick={() => navigate("/mypage")}
      style={{
        cursor: "pointer",
        position: "relative",
        left: "150px",
        top: "-550px",
      }}
    />
  );
};

export default GuideExit;
