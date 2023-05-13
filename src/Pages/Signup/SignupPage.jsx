import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import Signup from '../../Components/Signup/Signup';
import HeaderIcon from '../../Element/HeaderIcon';

const SignupPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="94px">{'가입하기'}</MessageBox>
      </Header>

      <Signup />
    </Wrap>
  );
};

export default SignupPage;
