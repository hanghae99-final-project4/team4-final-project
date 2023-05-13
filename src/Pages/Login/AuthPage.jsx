import React from 'react';

import Auth from '../../Components/Login/Auth';
import { Wrap } from './EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';

const AuthPage = () => {
  return (
    <Wrap>
      <Header msg={''} margin="63px">
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <Auth />
    </Wrap>
  );
};

export default AuthPage;
