import React from 'react';
import { Wrap } from '../Login/EmailPage';
import Header from '../../Components/Header/Header';
import StationSearch from '../../Components/Main/StationSearch';
import SearchBar from '../../Components/Main/SearchBar';

const StationSearchPage = () => {
  return (
    <Wrap>
      <Header margin="101px">
        <SearchBar />
      </Header>
      <StationSearch />
    </Wrap>
  );
};

export default StationSearchPage;
