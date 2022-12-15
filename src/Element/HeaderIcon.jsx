import React from "react";
import { ReactComponent as HeaderPointer } from "../Assets/HeaderItem/HeaderPointer.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderIcon = () => {
  const navigate = useNavigate();
  return (
    <HeaderPointer
      onClick={() => navigate("/mypage")}
      style={{
        cursor: "pointer",
        position: "relative",
        left: "5px",
        top: "-35px",
      }}
    />
  );
};

export default HeaderIcon;

const HeaderPointerDiv = styled.div`
  @media only screen and (min-width: 375px) {
    position: relative;
    left: 600px;
  }
`;
