import React from "react";
import styled from "styled-components";
import HeaderIcon from "../../Element/HeaderIcon";

const Header = () => {
  return (
    <div>
      {" "}
      <MainHeader>
        <HeaderIcon />
        환승시민
      </MainHeader>
    </div>
  );
};
export default Header;
const MainHeader = styled.div`
  background-color: #c3f4ff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
  align-items: center;
  justify-content: center;
`;
