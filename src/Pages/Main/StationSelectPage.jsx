import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import StationSelect from '../../Components/Main/StationSelect';
import HeaderIcon from '../../Element/HeaderIcon';

const StationSelectPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="101px">{'역 선택'}</MessageBox>
      </Header>
      <StationSelect />
    </Wrap>
  );
};

export default StationSelectPage;
