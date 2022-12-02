import React from "react";

const FrontHeader = ({ msg }) => {
  return (
    <h1 className="h-[45px] flex justify-center items-center bg-[#C3F4FF] text-center text-[1.2rem] font-bold">
      {msg}
    </h1>
  );
};

export default FrontHeader;
