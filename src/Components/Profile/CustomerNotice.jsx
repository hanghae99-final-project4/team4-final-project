import React from "react";
import styled from "styled-components";
import GuideAlert from "../../Element/GuideAlert";
import GuideExit from "../../Element/GuideExit";
import HeaderIcon from "../../Element/HeaderIcon";
import FrontHeader from "../Header/FrontHeader";
import HomeMenu from "../HomeMenu/HomeMenu";

const CustomerNotice = () => {
  return (
    <>
      <Wrap>
        <FrontHeadDiv>
          <FrontHeader msg={"나의정보"} />
          <HeaderIcon />
        </FrontHeadDiv>
        <TitleBox>
          <div>
            <p style={{ fontSize: "24px", fontWeight: "700" }}>
              고객 유의 사항
            </p>
          </div>
        </TitleBox>
        <GuideAlert />
        <HomeMenu />
      </Wrap>
    </>
  );
};
export default CustomerNotice;

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  div {
    width: 200px;
    height: 44px;
    border: 2px solid #71c9dd;
    border-radius: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const FrontHeadDiv = styled.div`
  width: 375px;
`;
