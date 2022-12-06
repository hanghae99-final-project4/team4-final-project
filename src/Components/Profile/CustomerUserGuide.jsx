import React from "react";
import GuideIcon from "../../Element/GuideIcon";
import styled from "styled-components";

const CustomerUserGuide = () => {
  return (
    <Wrap>
      <GuideIcon />
      <TitleBox>
        <div>
          <p style={{ fontSize: "24px", fontWeight: "700" }}>고객 유의 사항</p>
        </div>
      </TitleBox>
    </Wrap>
  );
};
export default CustomerUserGuide;

const Wrap = styled.div``;

const TitleBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  div {
    width: 114px;
    height: 44px;
    border: 2px solid #71c9dd;
    border-radius: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
