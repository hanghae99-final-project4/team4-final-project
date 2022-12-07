import React from "react";
import { ReactComponent as LoadingIconItem } from "../Assets/Chatting/LoadingIcon.svg";
import styled from "styled-components";
const LoadingIcon = () => {
  return (
    <LoadingDiv>
      <LoadingIconItem />
    </LoadingDiv>
  );
};

export default LoadingIcon;
const LoadingDiv = styled.div`
  margin-top: -30%;
`;
