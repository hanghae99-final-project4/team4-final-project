import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MypageHeader = ({ msg }) => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className=" h-[45px] flex justify-center items-center bg-[#C3F4FF] text-center text-[1.2rem] font-bold">
        <div className="ml-[33%] float-right flex justify-center items-center">
          <div className="mr-[30px]">{msg}</div>
          <div className="ml-[50px] float-right">
            <LogoutBtn
              onClick={() => {
                navigate("/");
              }}
              style={{ fontSize: "1rem", fontWeight: "700" }}
            >
              로그아웃
            </LogoutBtn>
          </div>
        </div>
      </h1>
    </>
  );
};

export default MypageHeader;

const LogoutBtn = styled.button``;
