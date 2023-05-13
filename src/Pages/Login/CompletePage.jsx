import React from 'react';
import { Wrap } from './EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import Complete from './../../Components/Login/Complete';
import HeaderIcon from '../../Element/HeaderIcon';

const CompletePage = () => {
  return (
    <Wrap>
      <Header msg={''} margin="63px">
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <Complete />
    </Wrap>
  );
};

export default CompletePage;
