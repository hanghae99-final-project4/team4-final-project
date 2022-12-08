import React from "react";
import spot from "../../Assets/NewFooterHome/Chatting.svg";
import home from "../../Assets/NewFooterHome/Home.svg";
import mypage from "../../Assets/NewFooterHome/Profile.svg";
import { useNavigate } from "react-router-dom";

const SubwayHome = () => {
  const navigator = useNavigate();
  return (
    <footer className="w-full absolute bottom-[-90px] h-[50px] bg-[#FFFFFF] shadow-[5px_0px_4px_rgba(0,0,0,0.25)] flex flex-auto justify-center items-center">
      <div className="w-[375px] h-[50px] bg-[#FFFFFF]">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigator("/subwaypage");
          }}
          className="w-[125px] h-[50px] float-left flex justify-center items-center cursor-pointer hover:shadow-inner"
        >
          <img src={home} alt="home" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigator("/converspage");
          }}
          className="w-[125px] h-[50px] float-left flex justify-center items-center cursor-pointer hover:shadow-inner"
        >
          <img src={spot} alt="home" />
        </button>
        <button
          className="w-[125px] h-[50px] float-right flex justify-center items-center cursor-pointer hover:shadow-inner"
          onClick={(e) => {
            e.preventDefault();
            navigator("/mypage");
          }}
        >
          <img src={mypage} alt="mypage" />
        </button>
      </div>
    </footer>
  );
};

export default SubwayHome;
