import React from "react";
import SubwayIcon from "../../Element/SubwayIcon";
import styled from "styled-components";
const Subway = () => {
  return (
    <SubwayDiv>
      <div>
        <SubwayIcon />
      </div>
      <SubwayMapDiv></SubwayMapDiv>
    </SubwayDiv>
  );
};

export default Subway;
const SubwayDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;

  height: 100vh;
`;
const SubwayMapDiv = styled.div`
  width: 1000px;
  height: 1000px;
  border: 1px solid black;
  overflow-y: scroll;
  background-image: url("https://gingernews.co.kr/wp-content/uploads/2022/05/img_subway.png");
  margin: auto;
  background-size: cover;
`;
