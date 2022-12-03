import React from "react";
import styled from "styled-components";
import Header from "../Components/Header/Header";
const ColorPage = () => {
  return (
    <ColorDiv>
      <Header />
    </ColorDiv>
  );
};

export default ColorPage;

const ColorDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`;
