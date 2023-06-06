import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import PasswordChange from '../../Components/Profile/PasswordChange';

const PasswordPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="77px">비밀번호 변경</MessageBox>
      </Header>
      <PasswordChange />
    </Wrap>
  );
};

export default PasswordPage;
