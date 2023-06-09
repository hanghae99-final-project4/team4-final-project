import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import Logout from '../../Components/Logout/Logout';

const LogoutPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <Logout />
    </Wrap>
  );
};

export default LogoutPage;
