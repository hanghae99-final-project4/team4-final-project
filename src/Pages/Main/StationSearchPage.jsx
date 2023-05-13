import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header, { PointerBox } from '../../Components/Header/Header';
import StationSearch from '../../Components/Main/StationSearch';
import SearchBar from '../../Components/Main/SearchBar';
import HeaderIcon2 from '../../Element/HeaderIcon2';

const StationSearchPage = () => {
  return (
    <Wrap>
      <Header>
        <PointerBox>
          <HeaderIcon2 />
        </PointerBox>
        <SearchBar />
      </Header>
      <StationSearch />
    </Wrap>
  );
};

export default StationSearchPage;
