import React from "react";
import { ReactComponent as HeaderPointer } from "../Assets/HeaderItem/HeaderPointer.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderIcon = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderPointer
        onClick={() => navigate("/converspage")}
        style={{ cursor: "pointer", position: "relative", left: "-140px" }}
      />
    </div>
  );
};

export default HeaderIcon;

const HeaderPointerDiv = styled.div`
  @media only screen and (min-width: 375px) {
    position: relative;
    left: 600px;
  }
`;
