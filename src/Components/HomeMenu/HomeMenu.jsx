import React from "react";
import mypage from "../../Assets/FooterHome/FooterUser.svg";
import home from "../../Assets/FooterHome/FooterHome.svg";
import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
  const navigator = useNavigate();
  return (
    <footer className="w-full absolute bottom-[0px] h-[50px] bg-[#C3F4FF] flex flex-auto justify-center items-center">
      <div className="w-[375px] h-[50px] bg-[#C3F4FF]">
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

export default HomeMenu;
