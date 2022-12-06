import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderIcon from "../../Element/HeaderIcon";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <MainHeader>
        <HeaderIcon onClick={() => navigate("/converspage")} />
        환승시민
      </MainHeader>
    </div>
  );
};
export default Header;
const MainHeader = styled.div`
  background-color: #c3f4ff;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  width: 100vw;
`;
