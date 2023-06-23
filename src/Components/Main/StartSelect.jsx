import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  useArriveState,
  useHistoryState,
  useSearchState,
  useStartState,
  useStationState,
} from '../../Recoil/userList';
import styled from 'styled-components';
import searchimg from '../../Assets/Station/search.svg';
import stationimg from '../../Assets/Main/station.svg';
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

const StartSelect = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useRecoilState(useHistoryState);
  const [station, setStation] = useRecoilState(useStationState);
  const start = useRecoilValue(useStartState);
  const searchHandler = (item) => {
    setHistory([...history, item]);

    setStation(item);
    navigate('/stationselect');
  };

  return (
    <>
      <Span>근처 역</Span>

      {/* 여기부터 검색창 리스트 */}
      {start?.length !== 0 ? (
        <SearchBox>
          {start?.map((item, i) => (
            <SearchList onClick={() => searchHandler(item)}>
              <img src={stationimg} alt="searchimg" />
              <Search>
                <span className="">{item?.place_name.split('역')[0]}</span>
              </Search>
              {item?.place_name.split('역')[1].split(' ')[1] === '02호선' ? (
                <img src={two} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '수인분당선' ? (
                <img src={suin} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '07호선' ? (
                <img src={seven} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '08호선' ? (
                <img src={eight} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '신분당선' ? (
                <img src={sin} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '05호선' ? (
                <img src={five} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '경춘선' ? (
                <img src={chun} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '경의선' ? (
                <img src={center} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '01호선' ? (
                <img src={one} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '03호선' ? (
                <img src={three} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '04호선' ? (
                <img src={four} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '06호선' ? (
                <img src={six} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '09호선' ? (
                <img src={nine} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '공항철도' ? (
                <img src={airport} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '인천1호선' ? (
                <img src={incheonone} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '인천2호선' ? (
                <img src={incheontwo} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '용인경전철' ? (
                <img src={yongin} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '김포도시철도' ? (
                <img src={gold} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '신림선' ? (
                <img src={sinrim} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '우이신설경전철' ? (
                <img src={woui} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '경강선' ? (
                <img src={kang} />
              ) : item?.place_name.split('역')[1].split(' ')[1] === '서해선' ? (
                <img src={seohae} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '의정부경전철' ? (
                <img src={ujungboo} />
              ) : item?.place_name.split('역')[1].split(' ')[1] ===
                '자기부상' ? (
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
            <NoResult>위치를 잡지 못하고 있어요.</NoResult>
            <ReConfirm>
              위치서비스를 허용 했는 지 <br />
              다시 한 번 더 확인 해 주세요
            </ReConfirm>
          </SearchResult>
        </ResultBox>
      )}
    </>
  );
};

export default StartSelect;

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
