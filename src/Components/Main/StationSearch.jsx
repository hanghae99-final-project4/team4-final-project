import React from 'react';
import { useRecoilState } from 'recoil';
import {
  useArriveState,
  useHistoryState,
  useSearchState,
} from '../../Recoil/userList';
import styled from 'styled-components';
import searchimg from '../../Assets/Station/search.svg';
import result from '../../Assets/Station/result.svg';
import { useNavigate } from 'react-router-dom';
import remove from '../../Assets/Station/remove.svg';

const StationSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useRecoilState(useSearchState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  const [history, setHistory] = useRecoilState(useHistoryState);
  const searchHandler = (item) => {
    setHistory([...history, item]);

    setArrive(item?.station_name);
    navigate('/stationselect');
  };

  const set = new Set(history);
  const newhistory = [...set];
  const removeHandler = (id) => {
    console.log(newhistory.id);
    setHistory((newhistory) => newhistory.filter((item) => item.id !== id));
  };
  console.log(newhistory);
  console.log(arrive);
  return (
    <>
      <Span>최근 검색어</Span>

      {newhistory.length !== 0 ? (
        <StationBox>
          {newhistory?.map((item, i) => (
            <Station id={item.id}>
              {item.station_name}
              <img
                id={item.id}
                onClick={() => removeHandler(item.id)}
                src={remove}
                alt="remove"
              />
            </Station>
          ))}{' '}
        </StationBox>
      ) : (
        <StationBox></StationBox>
      )}

      {/* 여기부터 검색창 리스트 */}
      {search?.length !== 0 ? (
        <SearchBox>
          {search?.map((item, i) => (
            <SearchList onClick={() => searchHandler(item)}>
              <img src={searchimg} alt="searchimg" />
              <Search>{item?.station_name}</Search>
            </SearchList>
          ))}
        </SearchBox>
      ) : (
        <ResultBox>
          <SearchResult>
            <img src={result} alt="resultimg" />
            <NoResult>일치하는 내용이 없습니다</NoResult>
            <ReConfirm>검색어를 다시 한 번 더 확인 해 주세요</ReConfirm>
          </SearchResult>
        </ResultBox>
      )}
    </>
  );
};

export default StationSearch;

const Span = styled.span`
  margin-top: 30px;
`;
const StationBox = styled.div`
  display: flex;
  width: 343px;
  margin-top: 14px;
  height: 48px;
  border-bottom: 1px solid #e7e7e7;
  gap: 2px;
`;
const Station = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-weight: 400;
  font-size: 13px;
  border-radius: 999px;
  width: auto;
  height: 34px;
  border: 1px solid #eaeaea;
  img {
    cursor: pointer;
  }
`;
const SearchBox = styled.div`
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SearchList = styled.div`
  gap: 4px;
  display: flex;
  width: 343px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const Search = styled.span`
  font-weight: 400;
  font-size: 16px;
`;
const SearchResult = styled.div`
  width: 210px;
  height: 114px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 41px;
    height: 43px;
  }
`;
const NoResult = styled.span`
  margin-top: 20px;
  font-weight: 500;
  font-size: 17px;
`;
const ResultBox = styled.div`
  margin-top: 50px;
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ReConfirm = styled.span`
  margin-top: 14px;
  font-weight: 400;
  font-size: 14px;
  color: #888888;
`;
