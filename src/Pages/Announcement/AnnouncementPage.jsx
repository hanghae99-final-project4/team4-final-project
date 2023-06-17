import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { MessageBox, PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import Announcement from '../../Components/Announcement/Announcement';

const AnnouncementPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
        <MessageBox margin="101px">공지사항</MessageBox>
      </Header>
      <Announcement />
    </Wrap>
  );
};

export default AnnouncementPage;
