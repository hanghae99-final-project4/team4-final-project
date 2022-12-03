import React from "react";
import styled from "styled-components";
import nextBtn from "../../Assets/NextBtn.svg";

const FooterNext = () => {
  return (
    <Footer>
      <FootBox>
        <img src={nextBtn} alt="nextButton" />
      </FootBox>
    </Footer>
  );
};

export default FooterNext;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;

  box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.2);

  background-color: #c3f4ff;
`;

const FootBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
