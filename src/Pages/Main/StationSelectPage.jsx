import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox } from '../../Components/Header/Header';
import StationSelect from '../../Components/Main/StationSelect';

const StationSelectPage = () => {
  return (
    <Wrap>
      <Header>
        <MessageBox margin="101px">{'역 선택'}</MessageBox>
      </Header>
      <StationSelect />
    </Wrap>
  );
};

export default StationSelectPage;
