import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import Report from '../../Components/Report/Report';

const ReportPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="94px">신고하기</MessageBox>
      </Header>
      <Report />
    </Wrap>
  );
};

export default ReportPage;
