import React from 'react';

import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import Signup from '../../Components/Signup/Signup';
import PickProfile from '../../Components/Signup/PickProfile';
import HeaderIcon from '../../Element/HeaderIcon';

const PickProfilePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <PickProfile />
    </Wrap>
  );
};

export default PickProfilePage;
