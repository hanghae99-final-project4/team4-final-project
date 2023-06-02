import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import HeaderIcon from '../../Element/HeaderIcon';
import ProfileChange from '../../Components/Profile/ProfileChange';

const ProfilePage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon />
        </PointerBox>
      </Header>
      <ProfileChange />
    </Wrap>
  );
};

export default ProfilePage;
