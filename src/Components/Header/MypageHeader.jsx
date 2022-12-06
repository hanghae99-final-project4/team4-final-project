import React from "react";
import HeaderIcon from "../../Element/HeaderIcon";

const FrontHeader = ({ msg }) => {
  return (
    <div>
      <h1 className="h-[45px] flex justify-center items-center bg-[#C3F4FF] text-center text-[1.2rem] font-bold">
        {msg}
      </h1>
      <HeaderIcon />
    </div>
  );
};

export default FrontHeader;
