import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import AnnounceDetail from '../../Components/Announcement/AnnounceDetail';

const AnnounceDetailPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <AnnounceDetail />
    </Wrap>
  );
};

export default AnnounceDetailPage;
