import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import StartSelect from '../../Components/Main/StartSelect';

const StartSelectPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="101px">역 선택</MessageBox>
      </Header>
      <StartSelect />
    </Wrap>
  );
};

export default StartSelectPage;
