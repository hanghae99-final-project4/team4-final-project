import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import NameChange from '../../Components/Profile/NameChange';

const NamePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="101px">닉네임변경</MessageBox>
      </Header>
      <NameChange />
    </Wrap>
  );
};

export default NamePage;
