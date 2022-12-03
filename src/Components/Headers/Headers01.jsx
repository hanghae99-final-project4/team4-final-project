import React from "react";

const Headers01 = ({ props }) => {
  return (
    <div className="h-[45px] flex justify-center items-center bg-[#D9D9D9] text-center text-[1.2rem] font-bold">
      {props.children}
    </div>
  );
};

export default Headers01;
