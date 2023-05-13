import React from 'react';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import styled from 'styled-components';
import EmailLogin from './../../Components/Login/EmailLogin';
import HeaderIcon from '../../Element/HeaderIcon';

const EmailPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
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
