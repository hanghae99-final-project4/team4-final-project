import React from 'react';
import GuideIcon from '../../Element/GuideIcon';
import styled from 'styled-components';
import GuideExit from '../../Element/GuideExit';
import FrontHeader from '../Header/MainHeader';
import HomeMenu from '../HomeMenu/HomeMenu';
import HeaderIcon from '../../Element/HeaderIcon';
const CustomerUserGuide = () => {
  return (
    <>
      <Wrap>
        <FrontHeadDiv>
          <FrontHeader msg="나의정보" />
          <HeaderIcon />
        </FrontHeadDiv>
        <TitleBox>
          <div>
            <p style={{ fontSize: '24px', fontWeight: '700' }}>
              고객 이용 가이드
            </p>
          </div>
        </TitleBox>
        <GuideIcon />

        <HomeMenu />
      </Wrap>
    </>
  );
};
export default CustomerUserGuide;

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
