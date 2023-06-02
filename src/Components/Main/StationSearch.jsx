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

//호선 별 이미지
import one from '../../Assets/Station/1.svg';
import two from '../../Assets/Station/2.svg';
import three from '../../Assets/Station/3.svg';
import four from '../../Assets/Station/4.svg';
import five from '../../Assets/Station/5.svg';
import six from '../../Assets/Station/6.svg';
import seven from '../../Assets/Station/7.svg';
import eight from '../../Assets/Station/8.svg';
import nine from '../../Assets/Station/9.svg';
import sin from '../../Assets/Station/신분당.svg';
import suin from '../../Assets/Station/수인분당.svg';
import incheonone from '../../Assets/Station/인천1호선.svg';
import incheontwo from '../../Assets/Station/인천2호선.svg';
import kang from '../../Assets/Station/경강선.svg';
import center from '../../Assets/Station/경의중앙.svg';
import chun from '../../Assets/Station/경춘선.svg';
import gold from '../../Assets/Station/김포골드.svg';
import seohae from '../../Assets/Station/서해선.svg';
import sinrim from '../../Assets/Station/신림선.svg';
import woui from '../../Assets/Station/우이신설.svg';
import ujungboo from '../../Assets/Station/의정부경전철.svg';
import boosang from '../../Assets/Station/자기부상.svg';
import airport from '../../Assets/Station/공항철도.svg';
import yongin from '../../Assets/Station/용인경전철.svg';

const StationSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useRecoilState(useSearchState);
  const [arrive, setArrive] = useRecoilState(useArriveState);
  const [history, setHistory] = useRecoilState(useHistoryState);
  const searchHandler = (item) => {
    setHistory([...history, item]);

    setArrive(item);
    navigate('/stationselect');
  };

  const set = new Set(history);
  const newhistory = [...set];
  const removeHandler = (id) => {
    setHistory((newhistory) => newhistory.filter((item) => item.id !== id));
  };
  console.log(search);
  return (
    <>
      <Span>최근 검색어</Span>

      {newhistory.length !== 0 ? (
        <StationBox>
          {newhistory?.map((item, i) => (
            <Station onClick={() => searchHandler(item)} id={item.id}>
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
              <Search>
                <span className="red">{item?.station_name[0]}</span>
                {item?.station_name.slice(1, item?.station_name?.length)}
              </Search>
              {item?.line_number === '02호선' ? (
                <img src={two} />
              ) : item?.line_number === '수인분당선' ? (
                <img src={suin} />
              ) : item?.line_number === '07호선' ? (
                <img src={seven} />
              ) : item?.line_number === '08호선' ? (
                <img src={eight} />
              ) : item?.line_number === '신분당선' ? (
                <img src={sin} />
              ) : item?.line_number === '05호선' ? (
                <img src={five} />
              ) : item?.line_number === '경춘선' ? (
                <img src={chun} />
              ) : item?.line_number === '경의선' ? (
                <img src={center} />
              ) : item?.line_number === '01호선' ? (
                <img src={one} />
              ) : item?.line_number === '03호선' ? (
                <img src={three} />
              ) : item?.line_number === '04호선' ? (
                <img src={four} />
              ) : item?.line_number === '06호선' ? (
                <img src={six} />
              ) : item?.line_number === '09호선' ? (
                <img src={nine} />
              ) : item?.line_number === '공항철도' ? (
                <img src={airport} />
              ) : item?.line_number === '인천선' ? (
                <img src={incheonone} />
              ) : item?.line_number === '인천2호선' ? (
                <img src={incheontwo} />
              ) : item?.line_number === '용인경전철' ? (
                <img src={yongin} />
              ) : item?.line_number === '김포도시철도' ? (
                <img src={gold} />
              ) : item?.line_number === '신림선' ? (
                <img src={sinrim} />
              ) : item?.line_number === '우이신설경전철' ? (
                <img src={woui} />
              ) : item?.line_number === '경강선' ? (
                <img src={kang} />
              ) : item?.line_number === '서해선' ? (
                <img src={seohae} />
              ) : item?.line_number === '의정부경전철' ? (
                <img src={ujungboo} />
              ) : item?.line_number === '자기부상' ? (
                <img src={boosang} />
              ) : (
                ''
              )}
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
  gap: 10px;
`;
const Station = styled.div`
  cursor: pointer;
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
  overflow-y: auto;

  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 1%;

    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
  }
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
  span {
    &.red {
      color: #fa3a45;
    }
  }
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
