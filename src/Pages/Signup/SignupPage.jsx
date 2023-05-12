import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox } from '../../Components/Header/Header';
import Signup from '../../Components/Signup/Signup';

const SignupPage = () => {
  return (
    <Wrap>
      <Header>
        <MessageBox margin="94px">{'가입하기'}</MessageBox>
      </Header>

      <Signup />
    </Wrap>
  );
};

export default SignupPage;
