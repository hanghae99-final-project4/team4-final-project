import React from "react";
import { ReactComponent as HeaderPointer } from "../Assets/HeaderItem/HeaderPointer.svg";
const HeaderIcon = () => {
  return (
    <div>
      <HeaderPointer
        style={{ cursor: "pointer", position: "relative", left: "-750px" }}
      />
    </div>
  );
};

export default HeaderIcon;
