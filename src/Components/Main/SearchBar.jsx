import React from 'react';
import useInput from '../../MyTools/Hooks/UseInput';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { trainApi } from '../../apis/Instance';
import { useStation } from '../../MyTools/quries/station';
import { useRecoilState } from 'recoil';
import { useArrvieState, useSearchState } from '../../Recoil/userList';
import StationSelect from './StationSelect';
import StationSearch from './StationSearch';

const SearchBar = () => {
  const [search, SetSearch] = useRecoilState(useSearchState);
  const queryClient = useQueryClient();
  const [station, setStation, onChange, reset] = useInput();
  const { data } = useStation(station?.station);
  SetSearch(data);
  // console.log(arrive);

  return (
    <Search
      value={station?.station}
      name="station"
      onChange={onChange}
      placeholder="역 명의 한 글자 또는 전체를 입력해 주세요"
    ></Search>
  );
};

export default SearchBar;

const Search = styled.input`
  background-color: #f5f4f4;
  font-size: 14px;
  font-weight: 400;
  color: #9a9a9a;
  width: 312px;
  height: 40px;
  border-radius: 4px;
`;
