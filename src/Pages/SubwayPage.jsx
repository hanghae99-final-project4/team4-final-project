import React, { useState } from 'react';
import Subway from '../Components/Chatting/Subway';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import TransferHeader from '../Components/Header/MainHeader';

const SubwayPage = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  //쿼리 token 가져오기
  // eslint-disable-next-line no-undef

  //구글,카카오 로그인 할 경우 파라미터 값 가져와서 토큰 쿠키에 장착하기.

  return (
    <SubWayDiv>
      <TransferHeader />
      <Subway />
    </SubWayDiv>
  );
};

export default SubwayPage;
const SubWayDiv = styled.div`
  width: 375px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  z-index: 1;
`;
