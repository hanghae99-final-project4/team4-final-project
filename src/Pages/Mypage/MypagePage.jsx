import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import MyPage from '../../Components/Profile/Mypage';

const MypagePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <MyPage />
    </Wrap>
  );
};

export default MypagePage;
