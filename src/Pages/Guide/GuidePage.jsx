import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import Guide from '../../Components/Guide/Guide';

const GuidePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="101px">이용방법</MessageBox>
      </Header>
      <Guide />
    </Wrap>
  );
};

export default GuidePage;
