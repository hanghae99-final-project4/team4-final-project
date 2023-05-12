import React from 'react';
import Header, { MessageBox } from '../../Components/Header/Header';
import styled from 'styled-components';
import EmailLogin from './../../Components/Login/EmailLogin';

const EmailPage = () => {
  return (
    <Wrap>
      <Header>
        <MessageBox margin="63px">{'이메일로 시작하기'}</MessageBox>
      </Header>
      <EmailLogin />
    </Wrap>
  );
};

export default EmailPage;

export const Wrap = styled.div`
  width: 375px;
  height: 812px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
