import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import AnnounceWrite from '../../Components/Announcement/AnnounceWrite';

const AnnounceWritePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="100px">공지사항 작성</MessageBox>
      </Header>
      <AnnounceWrite />
    </Wrap>
  );
};

export default AnnounceWritePage;
